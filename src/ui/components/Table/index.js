import _ from 'lodash'
import React, { PureComponent } from 'react'
import { ListView, View, Text } from 'react-native'

import { styles } from './styles'
import TouchableView from '../TouchableView'
import Icon from '../Icon'
import TextInput from '../TextInput'


export default class Table extends PureComponent {
  static defaultProps = {
    renderHeader: null,
    showFilter: false,
    sortColumn: null,
    sortDesc: false
  }

  state = {
    filter: null
  }

  render () {
    const { style, renderHeader, showFilter, headerRowStyle } = this.props

    return (
      <View style={[ styles.table, style ]}>
        {showFilter ? this._renderFilterInput() : null}
        {renderHeader ? renderHeader() : (
          <View style={[ styles.headerRow, headerRowStyle ]}>
            {this._renderHeaderColumns()}
          </View>
        )}
        {this._renderBody()}
      </View>
    )
  }

  _renderFilterInput () {
    const { filterInputStyle } = this.props
    const { filter } = this.state

    return (
      <TextInput
        onChangeText={this._onFilterChange}
        defaultValue={filter}
        style={[ styles.filterInput, filterInputStyle ]}
      />
    )
  }

  _onFilterChange = filter => this.setState({ filter })

  _renderHeaderColumns () {
    const {
      columns,
      onColumnHeaderPress,
      sortColumn,
      sortDesc
    } = this.props

    const renderedSortArrow = (!sortColumn) ? null : (
        <Icon
          style={styles.sortIconText}
          name={sortDesc ? 'caret-down' : 'caret-up'} />
    )

    return columns.map(col => {
      const { id, label, render, textStyle, boxStyle, disableSort } = col

      const renderedLabel = (render)
        ? render(col, sortColumn, sortDesc)
        : (
            <Text style={[ styles.headerColumnText, textStyle ]}>
              {label} {sortColumn === id ? renderedSortArrow : null}
            </Text>
        )

      const onPress = (onColumnHeaderPress && !disableSort)
        ? () => onColumnHeaderPress(col)
        : null

      return (
        <TouchableView
          key={id}
          onPress={onPress}
          style={[ styles.headerColumn, boxStyle ]}
        >
          {renderedLabel}
        </TouchableView>
      )
    })
  }

  _renderBody () {
    const { listStyle, sortColumn, sortDesc } = this.props
    const { filter } = this.state

    let { rows } = this.props

    if (filter) {
      rows =
        rows.filter(({ _filterKey }) => (_filterKey && _filterKey.includes(filter)))
    }

    if (sortColumn) {
      const sortMultiplier = sortDesc ? -1 : 1

      // for extra space at bottom of list
      rows = rows.concat([])

      rows.sort((a, b) => {
        const aValue = _.get(a[sortColumn], 'sortValue', _.get(a[sortColumn], 'value'))
        const bValue = _.get(b[sortColumn], 'sortValue', _.get(b[sortColumn], 'value'))

        return (aValue < bValue) ? -sortMultiplier : sortMultiplier
      })
    }

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.key !== r2.key
    }).cloneWithRows(rows)


    return (
      <ListView
        enableEmptySections={true}
        style={listStyle}
        dataSource={ds}
        renderRow={this._renderBodyRow}
      />
    )
  }

  _renderBodyRow = (row, __, rowID) => {
    const { rowStyle } = this.props

    return (
      <View style={[
        styles.row,
        (rowID % 2 ? styles.rowOdd : styles.rowEven),
        rowStyle
      ]}>
        {this._renderRowColumns(row)}
      </View>
    )
  }

  _renderRowColumns (row) {
    const { columns } = this.props

    return columns.map(({ id }) => {
      const { render, boxStyle, textStyle, value } = (row[id] || {})

      const renderedColumnData = render ? render(row[id]) : (
        <Text style={[ styles.columnText, textStyle ]}>
          {value || ''}
        </Text>
      )

      return (
        <View key={id} style={[ styles.column, boxStyle ]}>
          {renderedColumnData}
        </View>
      )
    })
  }
}
