import { generateButtonStyles } from './utils'
import {
  colorTransparent,
  colorRed,
  colorOrange,
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
  addressBook: {
    address: {
      textColor: colorWhite
    },
    label: {
      textColor: colorGrayDark
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
      textColor: colorBlack
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
        backgroundColor: colorBlack,
        textColor: colorPurple
      },
      hover: {
        borderColor: colorBlack,
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
      default: {
        borderColor: colorPurple,
        backgroundColor: colorBlack,
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
