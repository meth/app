export const ROOT_FONT_SIZE = 18

module.exports = {
  rem: ROOT_FONT_SIZE,
  header: {
    backgroundColor: '#000',
    textColor: '#fff'
  },
  content: {
    backgroundColor: '#fff',
    textColor: '#000'
  },
  browser: {
    tabBar: {
      backgroundColor: '#ccc',
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
      backgroundColor: '#f00',
      textColor: '#fff'
    },
    info: {
      backgroundColor: '#aaf',
      textColor: '#fff'
    }
  },
  modal: {
    title: {
      textColor: '#999'
    },
    content: {
      backgroundColor: '#fff'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    }
  },
  form: {
    textInput: {
      borderColor: '#999'
    }
  },
  button: {
    default: {
      enabled: {
        borderColor: '#22f',
        backgroundColor: '#22f',
        textColor: '#fff'
      },
      disabled: {
        borderColor: '#ccc',
        backgroundColor: '#ccc',
        textColor: '#fff'
      }
    }
  }
}
