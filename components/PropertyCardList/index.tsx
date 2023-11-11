import { FC } from 'react'
import PropTypes from 'prop-types'
import { Toaster } from 'react-hot-toast'
import { IPropertyList } from 'interfaces/PropertyList'
import { Row, Col } from 'react-bootstrap'
import PropertyCard from 'components/PropertyCard'
import LoadingScreen from 'components/LoadingScreen'
import { getLngArr } from '../../utils/getLng'

interface IPropertyFavorite extends IPropertyList {
  isShowUnFavorite?: boolean
  onHandleShowFavorite?: Function
  locale?: string | undefined
}
const PropertyCardList: FC<IPropertyFavorite> = ({
  items,
  isLoading,
  isError,
  isShowUnFavorite,
  onHandleShowFavorite,
  locale
}) => {
  if (isLoading || isError || items?.length === 0) {
    return (
      <LoadingScreen isLoading={isLoading} isError={isError} locale={locale} />
    )
  }
  const onShowFavorite = (status: boolean) => {
    if (!isShowUnFavorite) {
      if (typeof onHandleShowFavorite === 'function') {
        onHandleShowFavorite(status)
      }
    }
  }
  const tItems = getLngArr(items, locale?.toUpperCase() || 'TH', true)
  return (
    <>
      {/* call from PropertyCard */}
      <div id='toast'>
        <Toaster position='top-center' />
      </div>
      <Row>
        {items?.map(
          (
            {
              id,
              unitLocalStartingPrice,
              unitLocalPromotionPrice,
              unitGlobalStartingPrice,
              unitGlobalPromotionPrice,
              jobtype,
              isSoldOut,
              downloadLink,
              addressDetail,
              districtNameTh,
              subdistrictNameTh,
              provinceNameTh,
              postcode,
              fb,
              tw,
              line,
              copyLink,
              shareQuoteTh,
              shareQuoteEn,
              shareQuoteCn,
              achievementtype,
              favorite,
              shareFee,
              projectNameTh,
              projectNameEn,
              projectNameCn,
              unitBedRoomCount,
              unitBathRoomCount,
              unitUsableAreaSqm,
              unitLandAreaSqwa,
              unitFloorCount,
              jobinfoLabels,
              seoImageUrlTh,
              zoneNameTh,
              zoneNameEn,
              zoneNameCn,
              sharePrice,
              globalSharePrice,
              commissionPercentage,
              commissionPrice,
              globalCommissionPrice,
              pricePerUnitUsableAreaSqm,
              redirectExternalUrl,
              unitPropertyTypeNameTh,
              unitLocalSalePrice
            },
            index
          ) => (
            <Col
              key={`${index.toString()}-${projectNameTh}`}
              lg={4}
              className='mb-3'
            >
              <PropertyCard
                id={id}
                unitLocalStartingPrice={unitLocalStartingPrice}
                unitLocalPromotionPrice={unitLocalPromotionPrice}
                unitGlobalStartingPrice={unitGlobalStartingPrice}
                unitGlobalPromotionPrice={unitGlobalPromotionPrice}
                bannerurl={tItems('seoImageUrl', index) || seoImageUrlTh}
                jobtype={jobtype}
                isSoldOut={isSoldOut}
                downloadLink={downloadLink}
                propertytype={
                  tItems('unitPropertyTypeName', index) ||
                  unitPropertyTypeNameTh ||
                  ''
                }
                projectFullAddress={`${addressDetail || ''} ${
                  tItems('subdistrictName', index) || subdistrictNameTh || ''
                } ${tItems('districtName', index) || districtNameTh || ''} ${
                  tItems('provinceName', index) || provinceNameTh || ''
                } ${postcode || ''}`}
                fb={fb}
                tw={tw}
                line={line}
                copyLink={copyLink}
                shareQuoteTh={shareQuoteTh}
                shareQuoteEn={shareQuoteEn}
                shareQuoteCn={shareQuoteCn}
                achievementtype={achievementtype}
                favorite={favorite}
                onHandleShowFavorite={onShowFavorite}
                shareFee={shareFee}
                projectNameTh={projectNameTh}
                projectNameEn={projectNameEn}
                projectNameCn={projectNameCn}
                unitBedRoomCount={unitBedRoomCount}
                unitBathRoomCount={unitBathRoomCount}
                unitUsableAreaSqm={unitUsableAreaSqm}
                unitLandAreaSqwa={unitLandAreaSqwa}
                unitFloorCount={unitFloorCount}
                jobinfoLabels={jobinfoLabels}
                seoImageUrlTh={seoImageUrlTh}
                zoneNameTh={zoneNameTh}
                zoneNameEn={zoneNameEn}
                zoneNameCn={zoneNameCn}
                sharePrice={sharePrice}
                globalSharePrice={globalSharePrice}
                commissionPercentage={commissionPercentage}
                commissionPrice={commissionPrice}
                globalCommissionPrice={globalCommissionPrice}
                pricePerUnitUsableAreaSqm={pricePerUnitUsableAreaSqm}
                redirectExternalUrl={redirectExternalUrl}
                unitLocalSalePrice={unitLocalSalePrice}
              />
            </Col>
          )
        )}
      </Row>
    </>
  )
}

PropertyCardList.defaultProps = {
  isLoading: false,
  isError: false,
  items: [],
  isShowUnFavorite: true,
  onHandleShowFavorite: () => {},
  locale: ''
}

PropertyCardList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      bannerurl: PropTypes.string,
      projectName: PropTypes.string,
      jobtype: PropTypes.string,
      isSoldOut: PropTypes.bool.isRequired,
      downloadLink: PropTypes.string,
      propertytype: PropTypes.string,
      projectFullAddress: PropTypes.string.isRequired,
      copyLink: PropTypes.string.isRequired,
      line: PropTypes.string.isRequired,
      fb: PropTypes.string.isRequired,
      tw: PropTypes.string.isRequired,
      shareQuoteTh: PropTypes.string.isRequired,
      shareQuoteEn: PropTypes.string.isRequired,
      shareQuoteCn: PropTypes.string.isRequired,
      favorite: PropTypes.bool.isRequired,
      shareFee: PropTypes.number.isRequired,
      projectNameTh: PropTypes.string,
      projectNameEn: PropTypes.string,
      projectNameCn: PropTypes.string,
      unitBedRoomCount: PropTypes.number,
      unitBathRoomCount: PropTypes.number,
      unitUsableAreaSqm: PropTypes.number,
      unitLandAreaSqwa: PropTypes.number,
      unitFloorCount: PropTypes.number,
      seoImageUrlTh: PropTypes.string,
      sharePrice: PropTypes.number,
      globalSharePrice: PropTypes.number,
      commissionPercentage: PropTypes.number,
      commissionPrice: PropTypes.number,
      globalCommissionPrice: PropTypes.number,
      pricePerUnitUsableAreaSqm: PropTypes.number,
      zoneNameTh: PropTypes.string,
      zoneNameEn: PropTypes.string,
      zoneNameCn: PropTypes.string,
      unitLocalPromotionPrice: PropTypes.number,
      unitGlobalStartingPrice: PropTypes.number,
      unitGlobalPromotionPrice: PropTypes.number,
      jobinfoLabels: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          label: PropTypes.shape({
            id: PropTypes.number,
            titleTh: PropTypes.string,
            titleEn: PropTypes.string,
            titleCn: PropTypes.string,
            descriptionTh: PropTypes.string,
            descriptionEn: PropTypes.string,
            descriptionCn: PropTypes.string,
            colorCode: PropTypes.string
          }).isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ),
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isShowUnFavorite: PropTypes.bool,
  onHandleShowFavorite: PropTypes.func,
  locale: PropTypes.string
}

export default PropertyCardList
