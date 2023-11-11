import { FC } from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const WallQA: FC = () => {
  const { t } = useTranslation()
  return (
    <div className='position-relative text-center py-4'>
      <h2 className='display-2 mb-0 bn-fade text-uppercase'>
        {t('questionsAndAnswer.headerTitle')}
      </h2>
      <Link href='/faq'>
        <a className='stretched-link link-dark bn-fade'>
          {t('questionsAndAnswer.headerSubTitle')}
          <FiArrowRight className='ms-1 mb-1' />
        </a>
      </Link>
    </div>
  )
}

export default WallQA
