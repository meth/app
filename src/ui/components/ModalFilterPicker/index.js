import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { CachePureComponent } from '../../helpers/components'
import { t } from '../../../../common/strings'
import Modal from '../Modal'
import TitleText from '../TitleText'
import Table from '../Table'
import Button from '../Button'
import PickerButton from '../PickerButton'
import styles from './styles'


const RENDER_HEADER = () => null

const COLUMNS = [ { id: 'content' } ]


export default class ModalFilterPicker extends CachePureComponent {
  static propTypes = {
    style: PropTypes.any,
    selected: PropTypes.string,
    title: PropTypes.string,
    button: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    renderOption: PropTypes.func
  }

  state = {
    open: false
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

    const selectedOption = options.find(({ value }) => value === selected)
    const selectedLabel = _.get(selectedOption, 'label')

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
          onPress={this._onPressPickerButton}
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
              rowStyle={styles.tableRow}
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

  _onPressPickerButton = () => {
    this.open()
  }

  _onPressCloseButton = () => {
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
      <Button
        type='tableRow'
        style={styles.tableRowDataButton}
        textStyle={styles.tableRowDataButtonText}
        onPress={this.bind(this._onSelectEntry, value)}
        childShouldInheritTextStyle={!renderOption}
      >
        {renderOption
          ? renderOption(_.get(row, 'content', {}))
          : <Text style={styles.tableRowText}>{label}</Text>
        }
      </Button>
    )
  }

  _onSelectEntry = value => {
    const { onChange } = this.props

    this.close()

    if (onChange) {
      onChange(value)
    }
  }
}
