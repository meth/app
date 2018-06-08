import React from 'react'
// import { ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


// const CustomScrollView = props => (
//   <ScrollView
//     showsVerticalScrollIndicator={true}
//     showsHorizontalScrollIndicator={false}
//     overScrollMode='never'
//     {...props}
//   />
// )

const CustomScrollView = props => (
  <KeyboardAwareScrollView
    enableOnAndroid={true}
    {...props}
  />
)


export default CustomScrollView
