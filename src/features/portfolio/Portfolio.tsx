import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import PageHeader from 'common/components/PageHeader'
import Breadcrumbs, { TBreadcrumb } from 'common/components/Breadcrumbs'
import { TPageHeaderSortByOptions } from 'common/components/PageHeader/PageHeader'
import Select, { TOption } from 'common/components/Select/Select'
import NFTCard, {
  TNFTCard,
  NFTCardVariantSize,
} from 'common/components/NFTCard'
import Slider from 'common/components/Slider/Slider'
import * as ROUTES from 'common/utils/constants/routes'
import { useCurrencyName } from 'common/hooks/appInfo'

import styles from './Portfolio.module.css'

import avatar from 'common/assets/images/avatar-placeholder.png'
import portfolio1 from 'common/assets/images/mock/portfolio-1.jpg'
import portfolio2 from 'common/assets/images/mock/portfolio-2.jpg'
import portfolio3 from 'common/assets/images/mock/portfolio-3.jpg'
import portfolio4 from 'common/assets/images/mock/portfolio-4.jpg'

import {
  mockDataImagesList,
  mockAvatarImagesList,
  mockNamesList,
} from 'features/members/data'

const portfolios = [portfolio1, portfolio2, portfolio3, portfolio4]

const mockOptions: TOption[] = [
  { value: 'Likes', label: 'Likes' },
  { value: 'Categories', label: 'Categories' },
]

const mockCategories: TOption[] = [
  { value: 'all', label: 'All' },
  { value: 'illustration', label: 'Illustration' },
]

const mockStatus: TOption[] = [
  { value: 'all', label: 'All' },
  { value: 'auctions', label: 'Auction' },
  { value: 'makeAnOffers', label: 'Make-an-Offer' },
  { value: 'fixedPrice', label: 'Fixed-Price' },
]

const mockTime: TOption[] = [
  { value: 'Future', label: 'Future' },
  { value: 'Present', label: 'Present' },
  { value: 'Past', label: 'Past' },
]

const mockBreadcrumbs: TBreadcrumb[] = [
  {
    label: 'Portfolio',
    route: '#',
  },
  {
    label: 'My NFT Portfolio',
    route: '#',
  },
  {
    label: '',
  },
]

export default function Portfolio(): JSX.Element {
  const currencyName = useCurrencyName()

  const mockupPortfolio: TNFTCard[] = []
  Array.from({ length: 26 }).map((_, index) => {
    mockupPortfolio.push({
      author: mockNamesList[index],
      avatarSrc: mockAvatarImagesList[index],
      imageSrc: mockDataImagesList[index].url,
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: mockDataImagesList[index].title,
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      copies: `${index + 1} of 26`,
      diamond: `${Math.floor(Math.random() * 100)}%`,
      leftTime: dayjs().add(3, 'day').valueOf(),
      copiesAvailable: 15,
      isAuctionBid: (index + 1) % 2 === 0,
      isFixedPrice: (index + 1) % 3 === 0 && (index + 1) % 2 !== 0,
      isNotForSale: (index + 1) % 2 !== 0 && (index + 1) % 3 !== 0,
    })
  })

  const mockupPortfolioOwned: TNFTCard[] = [
    {
      author: 'zndrson',
      avatarSrc: avatar,
      imageSrc: portfolio1,
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: 'Cosmic Perspective longname test',
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      copies: '1 of 260',
      leftTime: dayjs().add(3, 'day').valueOf(),
      copiesAvailable: 15,
      isAuctionBid: true,
    },
    {
      author: 'zndrson',
      avatarSrc: avatar,
      imageSrc: portfolio2,
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: 'Cosmic Perspective longname test',
      copies: '1 of 260',
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      leftTime: dayjs().add(3, 'day').valueOf(),
      copiesAvailable: 15,
      isNotForSale: true,
    },
  ]

  const mockupPortfolioSold: TNFTCard[] = [
    {
      author: 'zndrson',
      avatarSrc: avatar,
      imageSrc: portfolio3,
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: 'Cosmic Perspective longname test',
      copies: '1 of 260',
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      leftTime: dayjs().add(5, 'day').valueOf(),
      copiesAvailable: 15,
      isFixedPrice: true,
    },
    {
      author: 'zndrson',
      avatarSrc: avatar,
      imageSrc: portfolio4,
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: 'Cosmic Perspective longname test',
      copies: '1 of 260',
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      leftTime: dayjs().add(1, 'day').valueOf(),
      copiesAvailable: 15,
      isNotForSale: true,
    },
  ]

  const mockupPortfolioLiked: TNFTCard[] = []
  Array.from({ length: 32 }).map((_, index) => {
    const randomPortfolioIndex = Math.floor(Math.random() * 4)
    mockupPortfolioLiked.push({
      author: 'zndrson',
      avatarSrc: avatar,
      imageSrc: portfolios[randomPortfolioIndex],
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: 'Cosmic Perspective longname test',
      copies: '1 of 260',
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      leftTime: dayjs().add(2, 'day').valueOf(),
      copiesAvailable: 15,
      isAuctionBid: (index + 1) % 2 === 0,
      isFixedPrice: (index + 1) % 3 === 0 && (index + 1) % 2 !== 0,
      isNotForSale: (index + 1) % 2 !== 0 && (index + 1) % 3 !== 0,
    })
  })

  const [selectedItem, setSelectedItem] = useState(0)
  const [filter, setFilter] = useState<TOption | null>(null)
  const [likes, setLikes] = useState<TOption | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState(mockBreadcrumbs)
  const [cards, setCards] = useState<TNFTCard[]>([])

  const pageHeaderSortByOptions: TPageHeaderSortByOptions[] = [
    {
      placeholder: 'In review (87)',
      selected: filter,
      onOptionChange: setFilter,
      options: mockOptions,
    },
  ]

  const sortByOptions: TPageHeaderSortByOptions = {
    placeholder: 'Likes',
    selected: likes,
    onOptionChange: setLikes,
    options: mockOptions,
  }

  // Filters
  const [category, setCategory] = useState<TOption | null>(mockCategories[0])
  const [type, settType] = useState<TOption | null>(mockStatus[0])
  const [time, setTime] = useState<TOption | null>(mockTime[0])

  const filterOptions = [
    {
      label: 'Categories',
      selected: category,
      onChange: setCategory,
      options: mockCategories,
      selectClassName: 'bg-white min-w-171px',
    },
    {
      label: 'Type',
      selected: type,
      onChange: settType,
      options: mockStatus,
      selectClassName: 'bg-white min-w-171px',
    },
    {
      label: 'Time',
      selected: time,
      onChange: setTime,
      options: mockTime,
      selectClassName: 'bg-white min-w-171px',
    },
  ]

  const routes = {
    data: [
      {
        label: 'Creator',
        count: mockupPortfolio.length,
      },
      {
        label: 'Sold',
        count: mockupPortfolioSold.length,
      },
      {
        label: 'Owned',
        count: mockupPortfolioOwned.length,
      },
      {
        label: 'Liked',
        count: mockupPortfolioLiked.length,
      },
    ],
    activeIndex: selectedItem,
    onToggle: setSelectedItem,
  }

  useEffect(() => {
    const updatedbreadcrumbs = [...breadcrumbs]
    updatedbreadcrumbs[2].label = routes.data[selectedItem].label
    setBreadcrumbs(updatedbreadcrumbs)

    switch (selectedItem) {
      case 1:
        setCards(mockupPortfolioOwned)
        break
      case 2:
        setCards(mockupPortfolioSold)
        break
      case 3:
        setCards(mockupPortfolioLiked)
        break
      default:
        setCards(mockupPortfolio)
    }
  }, [selectedItem])

  const [range, setRange] = useState<[number, number]>([400, 700])
  const [rarenessRange, setRarenessRange] = useState<[number, number]>([0, 1])
  const formatValue = (value: number) => `${value.toFixed(0)}k`
  const formatRarenessValue = (value: number) => `${value.toFixed(1)}`

  return (
    <div className='flex flex-col w-full min-h-full'>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader
        title='My NFT Portfolio'
        routes={routes}
        sortByOptions={pageHeaderSortByOptions}
        variant='portfolio'
        sortByText='Filter by'
        sortByTextClassName='font-medium text-gray-2d leading-4'
      />
      {cards?.length ? (
        <div className='wrapper px-33px'>
          <div className='flex items-center xl:justify-between flex-col xl:flex-row mt-30px mb-30px px-27px'>
            <div className='flex items-center w-full xl:w-auto'>
              {filterOptions.map(option => (
                <div className='mr-6' key={option.label}>
                  <Select {...option} />
                </div>
              ))}
            </div>
            <div className='flex items-center xl:justify-between mt-30px xl:mt-0 w-full xl:w-auto'>
              <div className='flex h-full items-center justify-end max-w-278px mr-6'>
                <p className='text-h6 pr-3 text-gray-2d'>Rareness</p>
                <Slider
                  min={0}
                  max={1}
                  hideLabel
                  values={rarenessRange}
                  onChange={setRarenessRange}
                  formatValue={formatRarenessValue}
                  formatTooltipValue={formatRarenessValue}
                  step={0.1}
                />
              </div>
              <div className='flex items-center mr-6'>
                <p className='pr-4 text-h5'>Sort by</p>
                <div className='flex space-x-6'>
                  <Select
                    placeholder={sortByOptions.placeholder}
                    options={sortByOptions.options}
                    selected={sortByOptions.selected}
                    onChange={sortByOptions.onOptionChange}
                    className='bg-white min-w-118px'
                  />
                </div>
              </div>
              <div className='flex h-full items-center justify-end max-w-278px'>
                <p className='text-h6 pr-3 text-gray-2d'>Price:</p>
                <Slider
                  min={0}
                  max={999}
                  hideLabel
                  values={range}
                  onChange={setRange}
                  formatValue={formatValue}
                  formatTooltipValue={formatValue}
                  step={1}
                />
              </div>
            </div>
          </div>
          <div className='w-full'>
            <div
              className={`${styles.portfolioContent} overflow-y-auto pl-27px pr-23px pb-30px mt-30px`}
            >
              <div className='grid grid-cols-3 1200px:grid-cols-4 xl:grid-cols-5 gap-y-[21px] gap-4'>
                {cards.map((nftItem, index) => (
                  <NFTCard
                    {...nftItem}
                    key={index}
                    hideFollow
                    variant={NFTCardVariantSize.M}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-grow flex-col items-center justify-center my-40vh'>
          <span className='mb-1.5 text-gray-4a text-lg font-black'>
            You have not created any NFTs
          </span>
          <p className='text-center text-gray-71 text-sm font-normal'>
            To create a new NFT, click the "new NFT" <br /> button at the top of
            the screen
          </p>
        </div>
      )}
    </div>
  )
}
