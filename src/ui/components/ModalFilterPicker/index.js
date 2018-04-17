import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { CachePureComponent } from '../../helpers/components'
import { t } from '../../../../common/strings'
import Modal from '../Modal'
import TouchableView from '../TouchableView'
import styles from './styles'


const RENDER_HEADER = () => null

const COLUMNS = [ { id: 'content' } ]


export default class ModalFilterPicker extends CachePureComponent {
  componentWillReceiveProps (newProps) {
    if ((!this.props.visible && newProps.visible) || (this.props.options !== newProps.options)) {
      this.setState({
        filter: ''
      })
    }
  }

  render () {
    const { open } = this.state

    const {
      style,
      selected,
      title,
      button,
      options
    } = this.props

    const { label: selectedLabel } = options.find(({ value }) => value === selected)

    const rows = options.map(({ value, label }) => ({
      content: {
        value,
        label
      },
      _filterKey: `${value} ${label || ''}`.toLowerCase()
    }))

    return (
      <View style={[ styles.container, style ]}>
        <PickerButton
          onPress={this.onPressButton}
          label={selectedLabel}
          open={open}
          {...button}
        />
        {(!open) ? null : (
          <Modal
            ref={this._onModalRef}
            contentStyle={styles.modalContent}
            onPressCloseButton={this._onPressCloseButton}
          >
            <TitleText text={title} />
            <Table
              style={styles.table}
              listStyle={styles.tableList}
              rowStyle={styles.tableRow}
              filterInputStyle={styles.tableFilter}
              filterPlaceholderText={t('modal.filterPicker.filterPlaceholder')}
              showFilter={true}
              renderHeader={RENDER_HEADER}
              renderRowData={this._renderRowData}
              columns={COLUMNS}
              rows={rows}
            />
          </Modal>
        )}
      </View>
    )
  }

  getValue () {
    return this.props.selected
  }

  focus () {
  }

  unfocus () {
  }

  open () {
    this.setState({
      open: true
    })
  }

  close () {
    this.setState({
      open: false
    })
  }

  _onPressCloseButton () {
    const { onCancel } = this.props

    this.close()

    if (onCancel) {
      onCancel()
    }
  }

  _onModalRef = e => {
    this.modal = e
  }

  _renderRowData = row => {
    const { renderOption } = this.props

    const value = _.get(row, 'content.value')
    const label = _.get(row, 'content.label')

    return (
      <TouchableView
        style={styles.tableRowData}
        type='modalPickerTableRow'
        onPress={this.bind(this.onSelectEntry, value)}
      >
        {renderOption
            ? renderOption(row)
            : <Text style={styles.tableRowText}>{label}</Text>
        }
      </TouchableView>
    )
  }

  _onSelectEntry = value => {
    const { onChange } = this.props

    if (onChange) {
      onChange(value)
    }
  }
}
