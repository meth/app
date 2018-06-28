import { getWindowDimensions, getHeaderHeight, isScreenHeightSmall, isScreenHeightVerySmall } from './'

export const getWalletCardHeight = () => {
  if (isScreenHeightVerySmall()) {
    return 180
  } else if (isScreenHeightSmall()) {
    return 230
  }

  return 230
}

export const getWalletViewCardSwiperFlex = () => {
  const cardHeight = getWalletCardHeight()

  const { height } = getWindowDimensions()

  return ((cardHeight * 1.0) / (height - getHeaderHeight())) + 0.1
}
