export type Contracts = {
  "version": "0.1.0",
  "name": "contracts",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "master",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createLottery",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "master",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ticketPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyTicket",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "pickWinner",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "lotteryId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "claimPrize",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lotteryId",
          "type": "u32"
        },
        {
          "name": "ticketId",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "lottery",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "ticketPrice",
            "type": "u64"
          },
          {
            "name": "lastTicketId",
            "type": "u32"
          },
          {
            "name": "winnerId",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "claimed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "master",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastId",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "ticket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "lotteryId",
            "type": "u32"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "WinnerAlreadyExists",
      "msg": "Winner already Exists"
    },
    {
      "code": 6001,
      "name": "NotEnoughTickets",
      "msg": "Can't chose Winner due to lack of Tickets"
    },
    {
      "code": 6002,
      "name": "WinnerNotChosen",
      "msg": "Winner not chosen yet"
    },
    {
      "code": 6003,
      "name": "InvalidWinner",
      "msg": "Invalid Winner"
    },
    {
      "code": 6004,
      "name": "AlreadyClosed",
      "msg": "Prize has been already claimed"
    }
  ]
};

export const IDL: Contracts = {
  "version": "0.1.0",
  "name": "contracts",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "master",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createLottery",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "master",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ticketPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyTicket",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "pickWinner",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "lotteryId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "claimPrize",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lotteryId",
          "type": "u32"
        },
        {
          "name": "ticketId",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "lottery",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "ticketPrice",
            "type": "u64"
          },
          {
            "name": "lastTicketId",
            "type": "u32"
          },
          {
            "name": "winnerId",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "claimed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "master",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastId",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "ticket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "lotteryId",
            "type": "u32"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "WinnerAlreadyExists",
      "msg": "Winner already Exists"
    },
    {
      "code": 6001,
      "name": "NotEnoughTickets",
      "msg": "Can't chose Winner due to lack of Tickets"
    },
    {
      "code": 6002,
      "name": "WinnerNotChosen",
      "msg": "Winner not chosen yet"
    },
    {
      "code": 6003,
      "name": "InvalidWinner",
      "msg": "Invalid Winner"
    },
    {
      "code": 6004,
      "name": "AlreadyClosed",
      "msg": "Prize has been already claimed"
    }
  ]
};
