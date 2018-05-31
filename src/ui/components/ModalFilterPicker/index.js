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
import FormWrapper from '../FormWrapper'
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
    onChange: PropTypes.func,
    onCancel: PropTypes.func,
    renderOption: PropTypes.func,
    renderButton: PropTypes.func
  }

  state = {
    open: false
  }

  render () {
    const { open } = this.state

    const {
      style,
      title,
      options,
      renderButton
    } = this.props

    const rows = options.map(({ value, label }) => ({
      content: {
        value,
        label
      },
      _filterKey: `${value} ${label || ''}`.toLowerCase()
    }))

    return (
      <View style={[ styles.container, style ]}>
        {renderButton ? renderButton(this._renderButton) : this._renderButton()}
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
              renderFilter={this._renderFilter}
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

  _renderButton = () => {
    const { open } = this.state

    const {
      selected,
      button,
      options
    } = this.props

    const selectedOption = options.find(({ value }) => value === selected)
    const selectedLabel = _.get(selectedOption, 'label')

    return (
      <PickerButton
        onPress={this._onPressPickerButton}
        label={selectedLabel}
        open={open}
        {...button}
      />
    )
  }

  _renderFilter = defaultRenderFunc => (
    <FormWrapper>
      {defaultRenderFunc()}
    </FormWrapper>
  )

  _renderRowData = row => {
    const { renderOption, renderOptionText } = this.props

    const content = _.get(row, 'content', {})

    if (renderOption) {
      return renderOption(content)
    }

    const { value, label } = content

    return (
      <Button
        type='tableRow'
        style={styles.tableRowDataButton}
        textStyle={styles.tableRowDataButtonText}
        onPress={this.bind(this._onSelectEntry, value)}
        childShouldInheritTextStyle={!renderOptionText}
      >
        {renderOptionText
          ? renderOptionText()
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
