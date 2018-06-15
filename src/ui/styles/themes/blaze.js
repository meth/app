import { generateButtonStyles } from './utils'
import { isWeb } from '../../../utils/deviceInfo'
import {
  colorTransparent,
  colorRed,
  colorOrange,
  colorYellowLight,
  colorBlack,
  colorWhite,
  colorGrayLightest,
  colorGrayLighter,
  colorGrayLight,
  colorGray,
  colorGrayDark,
  colorGrayDarker,
  colorGrayDarkest,
  toRGBA,
  lighten,
  darken
} from '../../../utils/colors'

const colorHoneyDew = '#f0fff1'
const colorTeaGreen = '#c2f8cb'
const colorMagicMint = '#b3e9c7'

const colorViolet = '#5603AD'
const colorVioletLight = lighten(colorViolet, 0.5)
// const colorUbe = '#8367C7'

export const ROOT_FONT_SIZE = 18

export default {
  rem: ROOT_FONT_SIZE,
  header: {
    backgroundColor: colorGrayLightest,
    textColor: colorGrayDarker
  },
  loading: {
    spinnerColor: colorViolet
  },
  content: {
    backgroundColor: colorWhite,
    textColor: colorGrayDarker,
    borderTop: {
      color: colorGrayLight
    },
    title: {
      textColor: colorGrayDarkest
    }
  },
  tabView: {
    backgroundColor: colorBlack,
    indicatorColor: colorWhite,
    tab: {
      backgroundColor: colorGrayDark
    },
    label: {
      textColor: colorWhite
    }
  },
  addressBook: {
    address: {
      textColor: colorGrayDarkest
    },
    label: {
      textColor: colorGray
    }
  },
  transactionBlock: {
    id: {
      textColor: colorGrayDarkest
    },
    icon: {
      textColor: colorGrayDarker
    },
    fromTo: {
      textColor: colorGrayDark
    },
    type: {
      textColor: colorGrayDark
    },
    details: {
      textColor: colorGrayDark
    },
    block: {
      textColor: colorGrayDarker
    },
    status: {
      accepted: {
        textColor: darken(colorMagicMint, 0.5)
      },
      rejected: {
        textColor: colorRed
      }
    }
  },
  pin: {
    hiddenChar: {
      textColor: colorBlack
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
          textColor: colorGrayDarkest
        },
        label: {
          textColor: colorGrayDark
        },
        amount: {
          textColor: colorBlack
        },
        unit: {
          textColor: colorGrayDarker
        }
      },
      inactive: {
        address: {
          textColor: colorGrayLight
        },
        label: {
          textColor: colorGrayLighter
        },
        amount: {
          textColor: colorGrayLight
        },
        unit: {
          textColor: colorGrayLighter
        }
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
        textColor: colorGrayDarker
      },
      name: {
        textColor: colorGray
      },
      balance: {
        textColor: colorGrayDarker
      },
      tableMessage: {
        textColor: colorGrayDarker
      }
    },
    swiper: {
      backgroundColor: colorWhite,
      navDot: {
        inactive: {
          backgroundColor: colorGray
        },
        active: {
          backgroundColor: colorGrayDarkest
        }
      }
    }
  },
  contracts: {
    params: {
      borderColor: colorGrayDark,
      backgroundColor: colorMagicMint
    }
  },
  browser: {
    tabBar: {
      backgroundColor: colorGray,
      tab: {
        inactive: {
          borderColor: colorGray,
          backgroundColor: colorGrayLight
        },
        active: {
          borderColor: colorGrayDark,
          backgroundColor: colorGrayLighter
        }
      }
    },
    navBar: {
      borderBottomColor: colorGrayLight,
      backgroundColor: colorGrayLighter
    },
    coverFlow: {
      backgroundColor: colorGrayDark,
      navDot: {
        default: {
          backgroundColor: colorGrayLight
        },
        active: {
          backgroundColor: colorGrayDarkest
        }
      }
    },
    mobileMenu: {
      backgroundColor: colorWhite,
      shadowColor: colorGrayDarker,
      option: {
        borderColor: colorGrayLighter,
        textColor: colorGrayDarker
      }
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
    backgroundColor: colorMagicMint,
    textColor: colorGrayDarkest
  },
  log: {
    unseenAlert: {
      backgroundColor: colorMagicMint,
      textColor: colorGrayDarkest,
      metaTextColor: colorGray
    },
    event: {
      backgroundColor: colorWhite,
      textColor: colorGrayDarkest,
      metaTextColor: colorGrayDark,
      warnColor: colorOrange,
      errorColor: colorRed,
      alertColor: colorTeaGreen
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
    editAddress: {
      metaTextColor: colorGray
    },
    sendTransaction: {
      txId: {
        textColor: colorGrayDark
      }
    },
    bookmarks: {
      url: {
        textColor: colorGray
      },
      label: {
        textColor: colorGrayDarker
      }
    }
  },
  form: {
    wrapper: {
      backgroundColor: colorHoneyDew
    },
    label: {
      textColor: colorGrayDarker
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
        backgroundColor: colorGrayLight
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
        trackColor: colorVioletLight,
        thumbColor: colorViolet,
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
          backgroundColor: colorTransparent,
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
    walletCard: generateButtonStyles(isWeb ? {
      default: {
        borderColor: colorGrayLight,
        backgroundColor: colorWhite,
        textColor: colorGrayLight
      },
      hover: {
        borderColor: colorViolet,
        backgroundColor: colorWhite,
        textColor: colorViolet
      }
    } : {
      default: {
        borderColor: colorGrayLight,
        backgroundColor: colorWhite,
        textColor: colorGrayLight
      },
      hover: {
        borderColor: colorGrayLight,
        backgroundColor: colorWhite,
        textColor: colorGrayLight
      }
    }),
    mobileBrowserTabs: generateButtonStyles({
      default: {
        borderColor: colorGrayDarker,
        backgroundColor: colorTransparent,
        textColor: colorGrayDarker
      },
      hover: {
        borderColor: colorGrayDarker,
        backgroundColor: colorTransparent,
        textColor: colorGrayDarker
      }
    }),
    browserAddressInput: generateButtonStyles({
      default: {
        borderColor: colorTransparent,
        backgroundColor: colorTransparent,
        textColor: colorGray
      },
      hover: {
        borderColor: colorTransparent,
        backgroundColor: colorTransparent,
        textColor: colorViolet
      }
    }),
    browserTab: generateButtonStyles({
      default: {
        borderColor: colorTransparent,
        backgroundColor: colorTransparent,
        textColor: colorGray
      },
      hover: {
        borderColor: colorTransparent,
        backgroundColor: colorViolet,
        textColor: colorWhite
      }
    }),
    browserPanel: generateButtonStyles({
      default: {
        borderColor: colorTransparent,
        backgroundColor: colorTransparent,
        textColor: colorGrayLight
      },
      hover: {
        borderColor: colorTransparent,
        backgroundColor: colorViolet,
        textColor: colorWhite
      }
    }),
    pinEntry: generateButtonStyles({
      default: {
        borderColor: colorGrayLight,
        backgroundColor: colorTransparent,
        textColor: colorGrayDark
      },
      hover: {
        borderColor: colorViolet,
        backgroundColor: colorVioletLight,
        textColor: colorWhite
      }
    }),
    textWithBorder: generateButtonStyles({
      spinnerColor: colorViolet,
      default: {
        borderColor: colorViolet,
        backgroundColor: colorTransparent,
        textColor: colorViolet
      },
      hover: {
        borderColor: colorViolet,
        backgroundColor: colorVioletLight,
        textColor: colorWhite
      }
    }, {
      default: {
        borderColor: colorTransparent,
        backgroundColor: colorTransparent,
        textColor: colorGrayLight
      },
      hover: {
        borderColor: colorTransparent,
        backgroundColor: colorGrayLight,
        textColor: colorGray
      }
    }),
    mobileDrawer: generateButtonStyles({
      spinnerColor: colorViolet,
      default: {
        borderColor: colorTransparent,
        backgroundColor: colorTransparent,
        textColor: colorViolet
      },
      hover: {
        borderColor: colorTransparent,
        backgroundColor: colorVioletLight,
        textColor: colorWhite
      }
    }),
    mobileHeader: generateButtonStyles({
      spinnerColor: colorGrayDarkest,
      default: {
        borderColor: colorTransparent,
        backgroundColor: colorTransparent,
        textColor: colorGrayDarkest
      },
      hover: {
        borderColor: colorTransparent,
        backgroundColor: colorTransparent,
        textColor: colorGrayDarkest
      }
    }),
    text: generateButtonStyles({
      spinnerColor: colorViolet,
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
        textColor: colorBlack
      },
      hover: {
        borderColor: colorViolet,
        backgroundColor: colorVioletLight,
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
