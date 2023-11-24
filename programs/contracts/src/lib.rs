use anchor_lang::prelude::*;

mod error;

declare_id!("6Vv3kh4g3PS44gKbgucL8xjTZbAySHobCo269g6BVibe");

#[program]
pub mod contracts {
    use anchor_lang::solana_program::{hash::hash, program::invoke, system_instruction::transfer};

    use super::*;

    pub fn initialize(_ctx: Context<InitMaster>) -> Result<()> {
        Ok(())
    }

    pub fn create_lottery(_ctx: Context<CreateLottery>, ticket_price: u64) -> Result<()> {
        let lottery = &mut _ctx.accounts.lottery;
        let master = &mut _ctx.accounts.master;
        master.last_id += 1;
        lottery.id = master.last_id;
        lottery.authority = _ctx.accounts.authority.key();
        lottery.ticket_price = ticket_price;
        msg!("Created Lotter {}", lottery.id);
        msg!("Ticket Price {}", lottery.ticket_price);
        msg!("Authority {}", lottery.authority);
        Ok(())
    }

    pub fn buy_ticket(_ctx: Context<BuyTicket>) -> Result<()> {
        let lottery = &mut _ctx.accounts.lottery;
        let ticket = &mut _ctx.accounts.ticket;
        let buyer = &mut _ctx.accounts.buyer;

        if lottery.winner_id.is_some() {
            return Err(error::LotteryError::AlreadyClosed.into());
        }

        invoke(
            &transfer(&buyer.key(), &lottery.key(), lottery.ticket_price),
            &[
                buyer.to_account_info(),
                lottery.to_account_info(),
                _ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        lottery.last_ticket_id += 1;
        ticket.id = lottery.last_ticket_id;
        ticket.lottery_id = lottery.id;
        ticket.authority = buyer.key();

        msg!("Bought Ticket {}", ticket.id);
        msg!("Ticket Authority {}", ticket.authority);
        Ok(())
    }

    pub fn pick_winner(_ctx: Context<PickWinner>, _lottery_id: u32) -> Result<()> {
        let lottery = &mut _ctx.accounts.lottery;

        if lottery.winner_id.is_some() {
            return Err(error::LotteryError::WinnerAlreadyExists.into());
        }

        if lottery.last_ticket_id == 0 {
            return Err(error::LotteryError::NotEnoughTickets.into());
        }

        let clock = Clock::get()?;
        let pseudo_random_number = ((u64::from_le_bytes(
            <[u8; 8]>::try_from(&hash(&clock.unix_timestamp.to_be_bytes()).to_bytes()[..8])
                .unwrap(),
        ) * clock.slot)
            % u32::MAX as u64) as u32;
        let winner_id = (pseudo_random_number % lottery.last_ticket_id) + 1;
        lottery.winner_id = Some(winner_id);

        msg!("Picked Winner {}", winner_id);
        Ok(())
    }

    pub fn claim_prize(_ctx: Context<ClaimPrize>, _lottery_id: u32, _ticket_id: u32) -> Result<()> {
        let lottery = &mut _ctx.accounts.lottery;
        let ticket = &mut _ctx.accounts.ticket;
        let winner = &mut _ctx.accounts.authority;

        if lottery.claimed {
            return Err(error::LotteryError::AlreadyClosed.into());
        }

        match lottery.winner_id {
            Some(winner_id) => {
                if winner_id != _ticket_id {
                    return Err(error::LotteryError::InvalidWinner.into());
                }
            }
            None => return Err(error::LotteryError::WinnerNotChosen.into()),
        }

        let prize = lottery
            .ticket_price
            .checked_mul(lottery.last_ticket_id.into())
            .unwrap();

        **lottery.to_account_info().lamports.borrow_mut() -= prize;
        **winner.to_account_info().lamports.borrow_mut() += prize;

        msg!(
            "{} claimed lamports {} from lottery id {} with ticket id {}",
            winner.key(),
            prize,
            lottery.id,
            ticket.id
        );

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(lottery_id: u32)]
pub struct PickWinner<'info> {
    #[account(mut, seeds = ["lottery".as_bytes(), &lottery_id.to_le_bytes()], bump)]
    pub lottery: Account<'info, Lottery>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct CreateLottery<'info> {
    #[account(init, payer = authority, space = 4 + 8, seeds = ["lottery".as_bytes(), &(master.last_id + 1).to_le_bytes()], bump)]
    pub lottery: Account<'info, Lottery>,

    #[account(mut, seeds = ["master".as_bytes()], bump)]
    pub master: Account<'info, Master>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Lottery {
    pub id: u32,
    pub authority: Pubkey,
    pub ticket_price: u64,
    pub last_ticket_id: u32,
    pub winner_id: Option<u32>,
    pub claimed: bool,
}

#[derive(Accounts)]
pub struct InitMaster<'info> {
    #[account(init, payer = payer, space = 4 + 8, seeds = ["master".as_bytes()], bump)]
    pub master: Account<'info, Master>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Master {
    pub last_id: u32,
}

#[derive(Accounts)]
#[instruction(lottery_id: u32, ticket_id: u32)]
pub struct ClaimPrize<'info> {
    #[account(mut, seeds = ["lottery".as_bytes(), &lottery_id.to_le_bytes()], bump)]
    pub lottery: Account<'info, Lottery>,

    #[account(mut, seeds = ["ticket".as_bytes(), lottery.key().as_ref(), &ticket_id.to_le_bytes()], bump, has_one = authority)]
    pub ticket: Account<'info, Ticket>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(lottery_id: u32)]
pub struct BuyTicket<'info> {
    #[account(mut, seeds = ["lottery".as_bytes(), &lottery_id.to_le_bytes()], bump)]
    pub lottery: Account<'info, Lottery>,

    #[account(init, payer = buyer, space = 4 + 4 + 32 + 8, seeds = ["ticket".as_bytes(), lottery.key().as_ref(), &(lottery.last_ticket_id + 1).to_le_bytes()], bump)]
    pub ticket: Account<'info, Ticket>,

    #[account(mut)]
    pub buyer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Ticket {
    pub id: u32,
    pub lottery_id: u32,
    pub authority: Pubkey,
}
