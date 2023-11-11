import { FC } from 'react'
import PropTypes from 'prop-types'
import { FiSend } from 'react-icons/fi'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import type { IUpdateShare } from 'interfaces/Share'

import { getCampaignCurrent } from 'services/campaign'
import { insertShare } from 'services/share'
import { usePropertyModalContext } from 'contexts/propertyModalContext'
import { useUser } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'
import isApp from 'utils/isApp'
import { MIN_TODAY_SHARE } from 'config/stamp'
import { SHARES } from './constants'
import { getLngFlex } from '../../../../utils/getLng'

interface IShare {
  title?: string
  className?: string
}

const ShareSocial: FC<IShare> = ({ title, className }) => {
  const { t } = useTranslation()
  const {
    state: { user, stampCount },
    dispatch
  } = useUser()
  const {
    state: {
      data: {
        id,
        shareQuoteTh,
        shareQuoteEn,
        shareQuoteCn,
        jobtype,
        achievementtype,
        redirectExternalUrl
      }
    }
  } = usePropertyModalContext()

  const {
    state: { language }
  } = useUser()

  const tShareQuote = getLngFlex(
    { shareQuoteTh, shareQuoteEn, shareQuoteCn },
    language.toUpperCase(),
    true
  )

  const { data: campaigmList } = useQuery(['CAMPAIGN'], () =>
    getCampaignCurrent()
  )

  const queryClient = useQueryClient()
  const updateShare = useMutation((data: IUpdateShare) => insertShare(data), {
    onSuccess: async (response) => {
      if (user) {
        const isCoupon = jobtype === 'Coupon'
        dispatch({ type: IUserDispatch.UPDATE_SHARE, payload: { isCoupon } })
        // if (achievementtype) {
        //   dispatch({
        //     type: IUserDispatch.UPDATE_ACHIEVEMENT,
        //     payload: { count: (user?.achievementShare || 0) + 1 }
        //   })
        // }
        const achivmentMax: number =
          campaigmList?.data.payload.achievementMax || 0
        const todayShare =
          response.data.payload.todayShare || user.todayShare || 0
        let isShare = false
        if (achivmentMax > 0) {
          if (
            user.achievementShare === MIN_TODAY_SHARE &&
            todayShare === MIN_TODAY_SHARE
          ) {
            isShare = true
          } else if (todayShare >= MIN_TODAY_SHARE && !user.todayStamp) {
            isShare = user?.achievementShare >= achivmentMax
            if (isShare && !user.todayStamp) {
              await queryClient.invalidateQueries(['stamp', user.id])
              dispatch({
                type: IUserDispatch.UPDATE_STAMP,
                payload: { count: stampCount + 1 }
              })
              dispatch({
                type: IUserDispatch.TODAY_STAMP
              })
            }
          }
          if (!user.todayStamp && isShare) {
            await queryClient.invalidateQueries(['stamp', user.id])
            dispatch({
              type: IUserDispatch.UPDATE_STAMP,
              payload: { count: stampCount + 1 }
            })
            dispatch({
              type: IUserDispatch.TODAY_STAMP
            })
          }
        } else if (todayShare === MIN_TODAY_SHARE) {
          await queryClient.invalidateQueries(['stamp', user.id])
          dispatch({
            type: IUserDispatch.UPDATE_STAMP,
            payload: { count: stampCount + 1 }
          })
        }
      }
    }
  })

  const onUpdateShare = (social: string, url: string) => {
    if (user) {
      const data: IUpdateShare = {
        url,
        agent: user.id,
        job: id,
        plat: social
      }
      if (achievementtype) {
        dispatch({
          type: IUserDispatch.UPDATE_ACHIEVEMENT,
          payload: { count: (user?.achievementShare || 0) + 1 }
        })
      }

      updateShare.mutate(data)
    }
  }

  return (
    <div className={className}>
      {title && <h5 className='mb-3 fw-600'>{title}</h5>}
      <div className='d-flex gap-2 align-items-center justify-content-center mb-4'>
        <small className='me-2 fw-500'>
          <FiSend /> {t('propertyModal.jobInfomation.shareTo')}
        </small>
        {SHARES.map(({ Component, name, Icon }) => {
          const httpLink =
            redirectExternalUrl && !!redirectExternalUrl
              ? redirectExternalUrl
              : `${window.location.origin}/a/${id}`

          const url = `${httpLink}?platform=${name}&ref=${user?.id}`
          if (url) {
            return (
              <Component
                key={name}
                url={`${decodeURI(url)}`}
                title={
                  name !== 'li'
                    ? tShareQuote('shareQuote')
                    : tShareQuote('shareQuote')?.slice(0, 180)
                }
                quote={tShareQuote('shareQuote')}
                className='d-flex flex-column align-items-center'
                beforeOnClick={
                  isApp()
                    ? () => {
                        onUpdateShare(name, url)
                      }
                    : null
                }
                onShareWindowClose={() => onUpdateShare(name, url)}
              >
                <Icon size={72} round />
              </Component>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}

ShareSocial.defaultProps = {
  title: '',
  className: ''
}

ShareSocial.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string
}

export default ShareSocial
