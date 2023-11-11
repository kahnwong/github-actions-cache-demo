import { FC, HTMLAttributes, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TitleBox from 'components/JobInfo/TitleBox'
import { Col, Row, Modal, Image as ImageReact } from 'react-bootstrap'
import Image from 'next/image'
import Carousel, {
  Modal as ReactImagesModal,
  ModalGateway,
  ViewType
} from 'react-images'
import { useDisclosure } from 'react-use-disclosure'
import { AiOutlineClose } from 'react-icons/ai'

import {
  IUnits,
  IUnitsButton,
  IUnitsComponent,
  IUnitVirtualTours
} from 'interfaces/JobInfo'
import { getLng } from 'utils/getLng'
import { useTranslation } from 'react-i18next'

import iconUsableAreaSqm from 'public/assets/icons/usableAreaSqm.svg'
import iconLandAreaSqwa from 'public/assets/icons/landAreaSqwa.svg'
import iconBedRoomCount from 'public/assets/icons/bedRoomCount.svg'
import iconBathRoomCount from 'public/assets/icons/bathRoomCount.svg'
import { IOptions } from 'interfaces/Form'
import {
  Wrapper,
  UnitInfoContainer,
  Button,
  ButtonImage,
  DetailBox,
  StatingPriceText,
  StatingPrice,
  PromotionPrice,
  ModalPlanTitle
} from './style'
import { Select } from '../style'
import { SelectBox } from '../../../layouts/PropertyLayout/style'

interface IPropertyUnitInfo extends HTMLAttributes<HTMLElement> {
  theme?: string
  locale?: string
  data?: IUnits[]
}

const PropertyUnitInfo: FC<IPropertyUnitInfo> = ({
  theme,
  data,
  locale,
  ...props
}) => {
  const { t } = useTranslation()
  const {
    isOpen: isShowPlanModal,
    open: openPlanModal,
    close: closePlanModal
  } = useDisclosure()

  const {
    isOpen: isShowUnittypeModal,
    open: openUnittypeModal,
    close: closeUnittypeModal
  } = useDisclosure()

  const [buttonList, setButtonList] = useState<IUnitsButton[]>([])
  const [selectUnit, setSelectUnit] = useState<IUnitsComponent>()
  const [selectUnitGalleries, setSelectUnitGalleries] = useState<ViewType[]>([])
  const [unitPlans, setUnitPlan] = useState<ViewType[]>([])
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [unitVirtualTours, setUnitVirtualTours] = useState<IUnitVirtualTours[]>(
    []
  )

  const selectedUnit = (id: number) => {
    const selectData = data?.find((row) => row.id === id) as IUnits

    const tJobInfoButton = getLng(
      selectData,
      locale?.toUpperCase() || 'TH',
      true
    )

    setSelectUnit({
      id: selectData.id,
      name: tJobInfoButton('name'),
      landAreaSqwa: selectData.landAreaSqwa as number,
      usableAreaSqm: selectData.usableAreaSqm as number,
      bedRoomCount: selectData.bedRoomCount as number,
      bathRoomCount: selectData.bathRoomCount as number,
      localStartingPrice: selectData.localStartingPrice as number,
      localPromotionPrice: selectData.localPromotionPrice as number
    })
    setSelectUnitGalleries(
      selectData.unitGalleries?.map((row) => ({
        caption: row.id,
        alt: row.imageAlt ?? '',
        source: row.imageUrl ?? ''
      })) ?? []
    )
    setUnitPlan(
      selectData.unitPlans?.map((row) => ({
        caption: row.id,
        source: row.imageUrl ?? '',
        alt: row.name ?? ''
      })) ?? []
    )
    setUnitVirtualTours(selectData.unitVirtualTours ?? [])
  }

  useEffect(() => {
    setButtonList(
      data
        ?.filter((row) => row.status === 'PUBLIC')
        ?.map((row) => {
          const tJobInfoButton = getLng(
            row,
            locale?.toUpperCase() || 'TH',
            true
          )

          return {
            id: row.id,
            name: tJobInfoButton('name')
          }
        }) ?? []
    )
    if (data) selectedUnit(data[0].id)
  }, [data])

  const urlValid = (urlValue: string) =>
    urlValue &&
    urlValue.match(
      '((http|https)?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
    )

  const onSelectUnitType = (value: IUnitsButton) => {
    selectedUnit(value.id)
  }

  const openUnitVirtualTours =
    unitVirtualTours[0] && urlValid(unitVirtualTours[0].url as string)
      ? unitVirtualTours[0].url
      : unitVirtualTours[0]?.thumbnailImageUrl
  const handleSelectPlan = (value: IOptions) => {
    setSelectedPlan(value.value as number)
  }

  const getOptionLabel = (value: IUnitsButton) => value.name
  const getOptionValue = (value: IUnitsButton): string => value.id.toString()

  return (
    <Wrapper {...props}>
      <UnitInfoContainer>
        <TitleBox text={t('jobinfo.unitInfo.title')} theme={theme} />
        <div className='d-flex d-lg-none justify-content-center'>
          <SelectBox
            theme={theme}
            placeholder={t('global.goto')}
            defaultValue={selectUnit}
            options={buttonList}
            value={selectUnit}
            onChange={(option) => onSelectUnitType(option as IUnitsButton)}
            getOptionLabel={(option) => getOptionLabel(option as IUnitsButton)}
            getOptionValue={(option) => getOptionValue(option as IUnitsButton)}
            classNamePrefix='react-select'
            className='w-100'
            instanceId='menu-register'
          />
        </div>

        <Row className='my-3 justify-content-center d-none d-lg-flex'>
          {buttonList &&
            buttonList.map((row) => (
              <Col
                className='text-center col-auto'
                key={`column-button-unit-${row.id}`}
              >
                <Button
                  theme={theme}
                  className={row.id === selectUnit?.id ? 'active my-2' : 'my-2'}
                  key={`button-unit-${row.id}`}
                  onClick={() => selectedUnit(row.id)}
                >
                  {row.name}
                </Button>
              </Col>
            ))}
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <div className='ratio ratio-fb'>
              {selectUnitGalleries[0]?.source && (
                <ImageReact
                  style={{ cursor: 'pointer' }}
                  onClick={openUnittypeModal}
                  src={selectUnitGalleries[0]?.source as string}
                  alt={selectUnitGalleries[0]?.alt}
                  fluid
                />
              )}
            </div>
          </Col>
          <Col xs={12} md={6} className='px-0 px-lg-5 pt-4 pt-md-0'>
            {(!!selectUnit?.usableAreaSqm ||
              !!selectUnit?.landAreaSqwa ||
              !!selectUnit?.bedRoomCount ||
              !!selectUnit?.bathRoomCount) && (
              <Row>
                {selectUnit?.usableAreaSqm && (
                  <Col xs={6} sm={6} className='py-2'>
                    <DetailBox>
                      <div>
                        <Image
                          src={iconUsableAreaSqm}
                          alt='iconUsableAreaSqm'
                        />
                      </div>
                      <div className='ms-3'>
                        <p className='mb-0 font-weight-bold line-height-xs'>
                          {selectUnit?.usableAreaSqm}
                        </p>
                        <p className='mb-0'>
                          {t('jobinfo.unitInfo.usableAreaSqm')}
                        </p>
                      </div>
                    </DetailBox>
                  </Col>
                )}
                {selectUnit?.landAreaSqwa && (
                  <Col xs={6} sm={6} className='py-2'>
                    <DetailBox>
                      <div>
                        <Image src={iconLandAreaSqwa} alt='iconLandAreaSqwa' />
                      </div>
                      <div className='ms-3'>
                        <p className='mb-0 font-weight-bold line-height-xs'>
                          {selectUnit?.landAreaSqwa}
                        </p>
                        <p className='mb-0'>
                          {t('jobinfo.unitInfo.landAreaSqwa')}
                        </p>
                      </div>
                    </DetailBox>
                  </Col>
                )}
                {selectUnit?.bedRoomCount && (
                  <Col xs={6} sm={6} className='py-2'>
                    <DetailBox>
                      <div>
                        <Image src={iconBedRoomCount} alt='iconBedRoomCount' />
                      </div>
                      <div className='ms-3'>
                        <p className='mb-0 font-weight-bold line-height-xs'>
                          {selectUnit?.bedRoomCount}
                        </p>
                        <p className='mb-0'>{t('jobinfo.bedroom')}</p>
                      </div>
                    </DetailBox>
                  </Col>
                )}
                {selectUnit?.bathRoomCount && (
                  <Col xs={6} sm={6} className='py-2'>
                    <DetailBox>
                      <div>
                        <Image
                          src={iconBathRoomCount}
                          alt='iconBathRoomCount'
                        />
                      </div>
                      <div className='ms-3'>
                        <p className='mb-0 font-weight-bold line-height-xs'>
                          {selectUnit?.bathRoomCount}
                        </p>
                        <p className='mb-0'>{t('jobinfo.bathroom')}</p>
                      </div>
                    </DetailBox>
                  </Col>
                )}
              </Row>
            )}
            <div className='mt-3'>
              {selectUnit?.localPromotionPrice ? (
                <>
                  <StatingPriceText>
                    {t('jobinfo.unitInfo.startingPrice')}
                  </StatingPriceText>
                  <StatingPrice theme={theme}>
                    {selectUnit?.localPromotionPrice.toLocaleString()}{' '}
                    {t('global.currency')}
                  </StatingPrice>
                  <PromotionPrice>
                    {t('jobinfo.unitInfo.promotionPrice')}{' '}
                    <del>
                      {selectUnit?.localStartingPrice!.toLocaleString()}
                    </del>{' '}
                    {t('global.currency')}
                  </PromotionPrice>
                </>
              ) : (
                <>
                  <StatingPriceText>
                    {t('jobinfo.unitInfo.startingPrice')}
                  </StatingPriceText>
                  <StatingPrice theme={theme}>
                    {selectUnit?.localStartingPrice!.toLocaleString()}{' '}
                    {t('global.currency')}
                  </StatingPrice>
                </>
              )}
            </div>
            <div className='mt-3'>
              <Row className='gap-md-0 gap-2'>
                {unitPlans.length > 0 && (
                  <Col xs='12' md='6'>
                    <ButtonImage theme={theme} onClick={openPlanModal}>
                      {t('jobinfo.unitInfo.buttonPlan')}
                    </ButtonImage>
                  </Col>
                )}
                {(unitVirtualTours[0]?.url ||
                  unitVirtualTours[0]?.thumbnailImageUrl) && (
                  <Col xs='12' md='6'>
                    <a
                      href={openUnitVirtualTours as string}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <ButtonImage theme={theme}>
                        {t('jobinfo.unitInfo.buttonVirtualTours')}
                      </ButtonImage>
                    </a>
                  </Col>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </UnitInfoContainer>
      <Modal show={isShowPlanModal} onHide={closePlanModal} size='xl'>
        <Wrapper>
          <Modal.Body>
            <div className='d-flex justify-content-between'>
              <div className='d-flex flex-column w-100'>
                <div className='d-flex ml-4 mb-3 align-items-center'>
                  {unitPlans.length === 1 ? (
                    <Button className='custom-theme-button-solid'>
                      {unitPlans[0]?.alt !== ''
                        ? unitPlans[0]?.alt
                        : t('jobinfo.unitInfo.modalPlan.noName')}
                    </Button>
                  ) : (
                    <>
                      <ModalPlanTitle>
                        {t('jobinfo.unitInfo.modalPlan.title')}
                      </ModalPlanTitle>
                      <Select
                        classNamePrefix='react-select'
                        theme={theme}
                        styles={{
                          option: (styles, { isSelected }) => ({
                            ...styles,
                            backgroundColor: isSelected ? theme : '',
                            ':hover': {
                              ...styles[':active'],
                              backgroundColor: theme ?? '#222529',
                              color: '#ffffff',
                              opacity: 0.7,
                              cursor: 'pointer'
                            }
                          }),
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? theme ?? '#222529'
                              : '#6C757D'
                          }),
                          container: (provided) => ({
                            ...provided,
                            minWidth: '200px'
                          })
                        }}
                        placeholder='กรุณาเลือกชั้น'
                        options={unitPlans.map(({ alt }, i) => ({
                          label: alt,
                          value: i
                        }))}
                        defaultValue={{
                          label: unitPlans[selectedPlan]?.alt,
                          value: selectedPlan
                        }}
                        onChange={(x) => handleSelectPlan(x as IOptions)}
                      />
                    </>
                  )}
                </div>
                <div className='w-100 d-flex justify-content-center'>
                  {unitPlans[selectedPlan]?.source && (
                    <div className='ratio ratio-4x3'>
                      <Image
                        src={unitPlans[selectedPlan]?.source as string}
                        alt={unitPlans[selectedPlan]?.alt}
                        layout='fill'
                        objectFit='fill'
                      />
                    </div>
                  )}
                </div>
              </div>
              <AiOutlineClose
                size='24px'
                className='can-click'
                onClick={closePlanModal}
              />
            </div>
          </Modal.Body>
        </Wrapper>
      </Modal>
      <ModalGateway>
        {isShowUnittypeModal ? (
          <ReactImagesModal onClose={closeUnittypeModal}>
            <Carousel views={selectUnitGalleries} />
          </ReactImagesModal>
        ) : null}
      </ModalGateway>
    </Wrapper>
  )
}

PropertyUnitInfo.defaultProps = {
  theme: '#000',
  locale: 'th',

  data: []
}
PropertyUnitInfo.propTypes = {
  theme: PropTypes.string,
  locale: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      landAreaSqwa: PropTypes.number,
      usableAreaSqm: PropTypes.number,
      bedRoomCount: PropTypes.number,
      bathRoomCount: PropTypes.number,
      parkingLotCount: PropTypes.number,
      totalUnitCount: PropTypes.number,
      floorCount: PropTypes.number,
      localStartingPrice: PropTypes.number,
      localPromotionPrice: PropTypes.number,
      globalStartingPrice: PropTypes.number,
      globalPromotionPrice: PropTypes.number,
      propertyType: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nameTh: PropTypes.string.isRequired,
        nameEn: PropTypes.string.isRequired,
        nameCn: PropTypes.string.isRequired
      }).isRequired,
      unitVirtualTours: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          thumbnailImageUrl: PropTypes.string,
          topic: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string
        }).isRequired
      ),
      unitGalleries: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          imageUrl: PropTypes.string,
          imageAlt: PropTypes.string
        }).isRequired
      ),
      unitPlans: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string,
          imageUrl: PropTypes.string
        }).isRequired
      ).isRequired
    }).isRequired
  )
}

export default PropertyUnitInfo
