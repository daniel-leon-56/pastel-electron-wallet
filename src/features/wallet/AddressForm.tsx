import cn from 'classnames'
import passEyeIcon from 'common/assets/icons/ico-pass-eye.svg'
import Tooltip from 'common/components/Tooltip'
import React, { useState } from 'react'
import { clipboard } from 'electron'
import { formatAddress } from 'common/utils/format'

import {
  Clipboard,
  CheckIcon,
  Pencil,
  SaveIcon,
  Close,
} from 'common/components/Icons'
import { useWalletScreenContext } from './walletScreen.context'

type TAddressFormProps = {
  address: string
  copyable?: boolean
  hidable?: boolean
  className?: string
}

export const AddressForm = ({
  address,
  copyable = true,
  hidable = false,
  className,
}: TAddressFormProps): JSX.Element => {
  const [edit, setEdit] = useState<string | null>(null)
  const [editName, setEditName] = useState<string>('')
  const [copyStatus, setCopyStatus] = useState<boolean>(false)
  const {
    addressBook: { addressBookMap, updateAddressBook },
    pastelPromoCode,
  } = useWalletScreenContext()

  const copyAddress = (address: string) => {
    if (copyStatus) {
      return
    }
    setCopyStatus(true)
    clipboard.writeText(address)
    setTimeout(() => {
      setCopyStatus(false)
    }, 2000)
  }

  const promoCode = pastelPromoCode.data?.find(code => code.address === address)

  const addressLabel = promoCode ? promoCode.label : addressBookMap[address]

  return (
    <div className={cn('flex xl:ml-21px items-center mr-2 md:mr-0', className)}>
      {edit === address ? (
        <>
          <input
            value={editName}
            onChange={e => {
              setEditName(e.target.value)
            }}
            className='w-220px md:w-[270px] h-10 border border-link text-sm font-medium rounded px-4'
          />
        </>
      ) : addressLabel ? (
        <div className='w-220px md:w-[312px]'>
          <Tooltip
            autoWidth={true}
            type='top'
            width={211}
            padding={5}
            content={formatAddress(address, 24)}
            classnames='py-2 text-gray-a0'
          >
            <span className='text-blue-3f cursor-pointer'>{addressLabel}</span>
          </Tooltip>
        </div>
      ) : (
        <span className='w-220px md:w-[270px] text-blue-3f cursor-pointer overflow-ellipsis overflow-hidden pl-[10px]'>
          {formatAddress(address, 24)}
        </span>
      )}
      {promoCode && <div className='w-5 h5 xl:ml-21px'>&nbsp;</div>}
      {edit === address ? (
        <>
          <div className='w-5 h-5 flex items-center ml-3 xl:ml-25px'>
            <button
              type='button'
              className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
              onClick={() => {
                setEdit(null)
              }}
            >
              <Close size={16} />
            </button>
          </div>
          <div className='w-5 h-5 flex items-center ml-3 xl:ml-22px'>
            <button
              type='button'
              className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
              onClick={() => {
                updateAddressBook({
                  address: edit,
                  label: editName,
                })
                setEdit(null)
              }}
            >
              <SaveIcon className='text-blue-3f' size={20} />
            </button>
          </div>
        </>
      ) : (
        <>
          {copyable && (
            <div className='w-5 h-5 flex items-center ml-3 xl:ml-7'>
              {copyStatus ? (
                <Tooltip
                  classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                  content='Copied'
                  width={70}
                  type='top'
                >
                  <span
                    onClick={() => copyAddress(address)}
                    className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
                  >
                    <CheckIcon className='text-green-45' size={14} />
                  </span>
                </Tooltip>
              ) : (
                <Tooltip
                  classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                  content='Copy address to clipboard'
                  width={120}
                  type='top'
                >
                  <span
                    onClick={() => copyAddress(address)}
                    className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
                  >
                    <Clipboard className='cursor-pointer' size={14} />
                  </span>
                </Tooltip>
              )}
            </div>
          )}
          <div className='w-5 h-5 flex items-center ml-3 xl:ml-26px'>
            {!promoCode && (
              <span
                onClick={() => {
                  setEditName(addressLabel || '')
                  setEdit(address)
                }}
                className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
              >
                <Pencil
                  strokeWidth={0.2}
                  className='cursor-pointer'
                  size={16}
                />
              </span>
            )}
          </div>
          {hidable && (
            <div className='flex items-center ml-13px'>
              <span className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'>
                <img className='cursor-pointer' src={passEyeIcon} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
