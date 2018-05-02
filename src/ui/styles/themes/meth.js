import { generateButtonStyles } from './utils'
import {
  colorTransparent,
  colorRed,
  colorOrange,
  colorPurpleDarker,
  colorPurpleDark,
  colorPurple,
  colorPurpleLight,
  colorGreen,
  colorYellowLight,
  colorBlack,
  colorWhite,
  colorGrayLight,
  colorGray,
  colorGrayDark,
  colorGrayDarker,
  colorGrayDarkest,
  toRGBA,
  lighten
} from '../../../utils/colors'

export const ROOT_FONT_SIZE = 18

export default {
  rem: ROOT_FONT_SIZE,
  header: {
    backgroundColor: colorBlack,
    textColor: colorGrayLight
  },
  loading: {
    spinnerColor: colorWhite
  },
  content: {
    backgroundColor: colorBlack,
    textColor: colorWhite,
    borderTop: {
      color: colorGrayDarkest
    },
    title: {
      textColor: colorGrayDark
    }
  },
  tabView: {
    backgroundColor: colorBlack,
    indicatorColor: colorGray,
    tab: {
      backgroundColor: colorGrayDark
    },
    label: {
      textColor: colorWhite
    }
  },
  addressBook: {
    address: {
      textColor: colorWhite
    },
    label: {
      textColor: colorGrayDark
    }
  },
  transactionBlock: {
    id: {
      textColor: colorWhite
    },
    icon: {
      textColor: colorGray
    },
    fromTo: {
      textColor: colorGrayDark
    },
    type: {
      textColor: colorGray
    },
    details: {
      textColor: colorGrayDarker
    },
    block: {
      textColor: colorGrayDark
    },
    status: {
      accepted: {
        textColor: colorGreen
      },
      rejected: {
        textColor: colorRed
      }
    }
  },
  balance: {
    amount: {
      textColor: colorWhite
    },
    unit: {
      textColor: colorGrayDark
    }
  },
  wallet: {
    card: {
      active: {
        address: {
          textColor: colorGrayLight
        },
        label: {
          textColor: colorGrayDark
        },
        amount: {
          textColor: colorWhite
        },
        unit: {
          textColor: colorGray
        },
        borderBottomColor: colorBlack
      },
      inactive: {
        address: {
          textColor: colorGrayDark
        },
        label: {
          textColor: colorGrayDarkest
        },
        amount: {
          textColor: colorGrayDarker
        },
        unit: {
          textColor: colorGrayDarker
        },
        borderBottomColor: colorPurple
      }
    },
    tabBar: {
      backgroundColor: colorTransparent,
      item: {
        inactive: {
          backgroundColor: colorTransparent,
          textColor: colorPurple
        },
        active: {
          backgroundColor: colorPurple,
          textColor: colorWhite
        }
      }
    },
    tokens: {
      symbol: {
        textColor: colorGray
      },
      name: {
        textColor: colorGrayDarker
      },
      balance: {
        textColor: colorGrayLight
      },
      tableMessage: {
        textColor: colorGray
      }
    }
  },
  contracts: {
    params: {
      borderColor: colorGrayDark,
      backgroundColor: colorBlack
    }
  },
  browser: {
    tabBar: {
      backgroundColor: colorGrayLight,
      tab: {
        inactive: {
          borderColor: '#999',
          backgroundColor: '#ccc'
        },
        active: {
          borderColor: '#666',
          backgroundColor: '#eee'
        }
      }
    },
    navBar: {
      borderBottomColor: '#ccc'
    }
  },
  alert: {
    error: {
      backgroundColor: colorRed,
      textColor: '#fff'
    },
    info: {
      backgroundColor: colorGrayDarker,
      textColor: '#fff'
    }
  },
  blockOfText: {
    backgroundColor: colorGrayDarker,
    textColor: '#fff'
  },
  log: {
    unseenAlert: {
      backgroundColor: colorGreen,
      textColor: colorWhite,
      metaTextColor: lighten(colorGreen, 0.4)
    },
    event: {
      backgroundColor: colorBlack,
      textColor: colorWhite,
      metaTextColor: colorGrayLight,
      warnColor: colorYellowLight,
      errorColor: colorOrange,
      alertColor: colorGreen
    }
  },
  modal: {
    content: {
      backgroundColor: colorBlack,
      textColor: colorWhite
    },
    overlay: {
      backgroundColor: toRGBA(colorWhite, 0.5)
    },
    alert: {
      overlay: {
        backgroundColor: toRGBA(colorBlack, 0.75)
      }
    },
    confirm: {
      overlay: {
        backgroundColor: toRGBA(colorBlack, 0.75)
      },
      backgroundColor: colorGrayDarkest,
      textColor: colorWhite
    },
    log: {
      overlay: {
        backgroundColor: toRGBA(colorWhite, 0.4)
      },
      content: {
        dividerColor: colorGrayDarker
      }
    },
    connectNode: {
      darkTextColor: colorGray
    },
    editAddress: {
      metaTextColor: colorGray
    },
    sendTransaction: {
      txId: {
        textColor: colorGrayLight
      }
    }
  },
  form: {
    textInput: {
      blurred: {
        borderColor: 'transparent',
        backgroundColor: colorWhite,
        textColor: colorBlack,
        placeholderTextColor: colorGray
      },
      focussed: {
        borderColor: 'transparent',
        backgroundColor: colorWhite,
        textColor: colorBlack,
        placeholderTextColor: colorGray
      },
      error: {
        backgroundColor: colorYellowLight
      }
    },
    picker: {
      borderColor: colorBlack,
      backgroundColor: colorWhite,
      hoverBackgroundColor: colorGrayLight,
      textColor: colorBlack,
      category: {
        textColor: colorGray
      }
    },
    section: {
      layout: {
        borderColor: colorGrayLight
      },
      title: {
        textColor: colorGrayLight
      }
    },
    switch: {
      on: {
        trackColor: colorGrayDarker,
        thumbColor: colorWhite,
        label: {
          textColor: colorWhite
        }
      },
      off: {
        trackColor: colorGrayLight,
        thumbColor: colorGrayDark,
        label: {
          textColor: colorGray
        }
      }
    },
    checkbox: {
      on: {
        box: {
          backgroundColor: colorGray,
          borderColor: colorGray,
          tickIcon: {
            color: colorWhite,
            opacity: 1
          }
        },
        label: {
          textColor: colorWhite
        }
      },
      off: {
        box: {
          backgroundColor: 'transparent',
          borderColor: colorGray,
          tickIcon: {
            color: colorGray,
            opacity: 0.2
          }
        },
        label: {
          textColor: colorGray
        }
      }
    }
  },
  button: {
    picker: generateButtonStyles({
      default: {
        borderColor: colorWhite,
        backgroundColor: colorWhite,
        textColor: colorBlack
      },
      hover: {
        borderColor: colorWhite,
        backgroundColor: colorWhite,
        textColor: colorBlack
      }
    }),
    mask: generateButtonStyles({
      default: {
        borderColor: colorPurpleDark,
        backgroundColor: toRGBA(colorPurpleDark, 0.97),
        textColor: colorWhite
      },
      hover: {
        borderColor: colorPurple,
        backgroundColor: colorPurple,
        textColor: colorWhite
      }
    }),
    walletCard: generateButtonStyles({
      default: {
        borderColor: colorPurpleDarker,
        backgroundColor: colorTransparent,
        textColor: colorPurpleDarker
      },
      hover: {
        borderColor: colorPurple,
        backgroundColor: colorTransparent,
        textColor: colorPurple
      }
    }),
    browserTab: generateButtonStyles({
      default: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        textColor: colorGray
      },
      hover: {
        borderColor: 'transparent',
        backgroundColor: colorGray,
        textColor: colorGrayLight
      }
    }),
    browserPanel: generateButtonStyles({
      default: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        textColor: colorGrayLight
      },
      hover: {
        borderColor: 'transparent',
        backgroundColor: colorGrayLight,
        textColor: colorGray
      }
    }),
    header: generateButtonStyles({
      default: {
        borderColor: colorBlack,
        backgroundColor: colorTransparent,
        textColor: colorPurple
      },
      hover: {
        borderColor: colorTransparent,
        backgroundColor: colorPurpleLight,
        textColor: colorWhite
      }
    }),
    tableRow: generateButtonStyles({
      default: {
        borderColor: colorTransparent,
        backgroundColor: colorTransparent,
        textColor: colorWhite
      },
      hover: {
        borderColor: colorPurpleLight,
        backgroundColor: colorPurpleLight,
        textColor: colorWhite
      }
    }),
    default: generateButtonStyles({
      spinnerColor: colorWhite,
      default: {
        borderColor: colorPurple,
        backgroundColor: colorTransparent,
        textColor: colorPurple
      },
      hover: {
        borderColor: colorPurpleLight,
        backgroundColor: colorPurpleLight,
        textColor: colorWhite
      }
    })
  },
  mnemonic: {
    confirmationBox: {
      topBorderColor: colorGrayDarker
    },
    backgroundColor: colorGrayDark,
    textColor: colorWhite
  },
  table: {
    default: {
      header: {
        backgroundColor: colorBlack,
        textColor: colorGrayDark
      },
      rowOdd: {
        backgroundColor: colorBlack
      },
      rowEven: {
        backgroundColor: colorGrayDarkest
      },
      column: {
        textColor: colorWhite
      }
    }
  }
}
