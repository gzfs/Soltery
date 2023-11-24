use anchor_lang::error_code;

#[error_code]
pub enum LotteryError {
    #[msg("Winner already Exists")]
    WinnerAlreadyExists,
    #[msg("Can't chose Winner due to lack of Tickets")]
    NotEnoughTickets,
    #[msg("Winner not chosen yet")]
    WinnerNotChosen,
    #[msg("Invalid Winner")]
    InvalidWinner,
    #[msg("Prize has been already claimed")]
    AlreadyClosed,
}
