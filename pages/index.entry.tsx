import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'

import PrivateLayout from 'layouts/PrivateLayout'
import SectionGroup from 'components/SectionGroup'
import Section from 'components/Section'
import PropertyModalContextProvider from 'contexts/propertyModalContext'
import PropertyModal from 'components/PropertyModal'
import WallProfile from 'components/WallProfile'
import WeeklyHighlight from 'components/WeeklyHighlight'
import WallQA from 'components/WallQA'
import WallHead from 'components/WallHead'
import withPrivate from 'hocs/withPrivate'
import { useUser } from 'contexts/userContext'
import { getMenuByJobType } from 'services/menu'
import StampBanner from 'components/StampBanner'
import PopupPromote from 'components/PopupPromote'
import HomeSearch from 'components/HomeSearch'
import SectionPropertyCard from 'components/SectionPropertyCard'

const Home: NextPage = () => {
  const { t } = useTranslation()
  const {
    state: { user, language }
  } = useUser()

  const { data: jobTypeData } = useQuery(
    ['job_type_home_page', { orderBy: 'ASC' }],
    () => getMenuByJobType({ orderBy: 'ASC' })
  )

  // Temporarily disable stamps by setting it to false
  const isShowStamp = false

  return (
    <PropertyModalContextProvider>
      <Head>
        <title>{t('homePage.headTitle')}</title>
      </Head>
      <PrivateLayout position='absolute'>
        <WallHead />

        {user?.interestFilled && <PopupPromote />}
        {/* <PopupPromote /> */}
        <SectionGroup>
          <div>
            <HomeSearch />
          </div>
          {(!user?.profileFilled || !user?.interestFilled) && (
            <Section className='py-4'>
              <WallProfile
                profileFilled={user?.profileFilled}
                interestFilled={user?.interestFilled}
              />
            </Section>
          )}
          {isShowStamp && (
            <Section className='pt-3 pb-4 py-main-5'>
              <StampBanner />
            </Section>
          )}

          <WeeklyHighlight />

          {/* <Section className='d-lg-none'>
            <WallMenu />
          </Section> */}
          {(jobTypeData?.data?.payload?.length || 0) > 0 &&
            jobTypeData?.data?.payload?.map((item) => (
              <SectionPropertyCard
                key={item?.id}
                itemData={item}
                locale={language}
              />
            ))}
          <Section className='bn-gradient-1 '>
            <WallQA />
          </Section>
        </SectionGroup>
      </PrivateLayout>
      <PropertyModal />
    </PropertyModalContextProvider>
  )
}

export default withPrivate(Home)
