import { generateButtonStyles } from './utils'
import {
  colorTransparent,
  colorRed,
  colorOrange,
  colorGreen,
  colorYellowLight,
  colorBlack,
  colorWhite,
  colorGrayLightest,
  colorGrayLight,
  colorGray,
  colorGrayDark,
  colorGrayDarker,
  colorGrayDarkest,
  toRGBA,
  lighten
} from '../../../utils/colors'

const colorHoneyDew = '#f0fff1'
const colorTeaGreen = '#c2f8cb'
const colorMagicMint = '#b3e9c7'

const colorViolet = '#5603AD'
const colorVioletLight = lighten(colorViolet, 0.5)
const colorUbe = '#8367C7'

export const ROOT_FONT_SIZE = 18

export default {
  rem: ROOT_FONT_SIZE,
  header: {
    backgroundColor: colorWhite,
    textColor: colorGrayDarker
  },
  loading: {
    spinnerColor: colorViolet
  },
  content: {
    backgroundColor: colorWhite,
    textColor: colorGrayDarker,
    borderTop: {
      color: colorGrayDarker
    },
    title: {
      textColor: colorGrayDarker
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
        borderBottomColor: colorViolet
      }
    },
    tabBar: {
      backgroundColor: colorTransparent,
      item: {
        inactive: {
          backgroundColor: colorTransparent,
          textColor: colorViolet
        },
        active: {
          backgroundColor: colorViolet,
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
      textColor: colorWhite
    },
    info: {
      backgroundColor: colorMagicMint,
      textColor: colorGrayDarker
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
      backgroundColor: colorWhite,
      textColor: colorGrayDarker
    },
    overlay: {
      backgroundColor: toRGBA(colorBlack, 0.6)
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
    wrapper: {
      backgroundColor: colorHoneyDew
    },
    textInput: {
      blurred: {
        borderColor: colorGrayDarker,
        backgroundColor: colorWhite,
        textColor: colorGrayDarker,
        placeholderTextColor: colorGray
      },
      focussed: {
        borderColor: colorBlack,
        backgroundColor: colorWhite,
        textColor: colorBlack,
        placeholderTextColor: colorGray
      },
      error: {
        backgroundColor: colorYellowLight
      },
      disabled: {
        backgroundColor: colorGray
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
        borderColor: colorGrayDark,
        backgroundColor: colorWhite,
        textColor: colorGrayDarker
      },
      hover: {
        borderColor: colorGrayDarker,
        backgroundColor: colorWhite,
        textColor: colorGrayDarker
      }
    }),
    mask: generateButtonStyles({
      default: {
        borderColor: colorViolet,
        backgroundColor: toRGBA(colorViolet, 0.97),
        textColor: colorWhite
      },
      hover: {
        borderColor: colorViolet,
        backgroundColor: colorVioletLight,
        textColor: colorWhite
      }
    }),
    walletCard: generateButtonStyles({
      default: {
        borderColor: colorUbe,
        backgroundColor: colorTransparent,
        textColor: colorUbe
      },
      hover: {
        borderColor: colorViolet,
        backgroundColor: colorTransparent,
        textColor: colorViolet
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
        borderColor: colorTransparent,
        backgroundColor: colorTransparent,
        textColor: colorViolet
      },
      hover: {
        borderColor: colorTransparent,
        backgroundColor: colorVioletLight,
        textColor: colorWhite
      },
      active: {
        borderColor: colorTransparent,
        backgroundColor: colorViolet,
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
        borderColor: colorUbe,
        backgroundColor: colorUbe,
        textColor: colorWhite
      }
    }),
    default: generateButtonStyles({
      spinnerColor: colorWhite,
      default: {
        borderColor: colorViolet,
        backgroundColor: colorViolet,
        textColor: colorWhite
      },
      hover: {
        borderColor: colorViolet,
        backgroundColor: colorVioletLight,
        textColor: colorWhite
      }
    })
  },
  mnemonic: {
    confirmationBox: {
      topBorderColor: colorGrayDarker
    },
    backgroundColor: colorMagicMint,
    textColor: colorBlack
  },
  table: {
    default: {
      header: {
        backgroundColor: colorWhite,
        textColor: colorGrayDark
      },
      rowOdd: {
        backgroundColor: colorGrayLightest
      },
      rowEven: {
        backgroundColor: colorGrayLight
      },
      column: {
        textColor: colorGrayDark
      }
    }
  }
}
