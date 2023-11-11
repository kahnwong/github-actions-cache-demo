import { FC, HTMLAttributes, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { IJobinfoPlan, IJobinfoPlanComponent } from 'interfaces/JobInfo'
import { useTranslation } from 'react-i18next'
import { Col, Container, Row } from 'react-bootstrap'
import { useDisclosure } from 'react-use-disclosure'
import Carousel, { Modal as ReactImagesModal, ModalGateway } from 'react-images'
import { IOptions } from 'interfaces/Form'
import { getLng } from 'utils/getLng'
import Title from 'components/JobInfo/Title'
import FormSelect from './Select'

interface IPropertyPlan extends HTMLAttributes<HTMLElement> {
  theme?: string
  locale?: string
  data?: IJobinfoPlan[]
}

const PropertyPlan: FC<IPropertyPlan> = ({ theme, data, locale, ...props }) => {
  const [planTypeOptions, setPlanTypeOptions] = useState<IOptions[]>([])
  const [planListOptions, setPlanListOptions] = useState<IOptions[]>([])
  const [planIdForm, setPlanIdForm] = useState<number>()
  const [planTypeIdForm, setPlanTypeIdForm] = useState<number>()
  const [planSelected, setPlanSelected] = useState<IJobinfoPlanComponent>()
  const { t } = useTranslation()
  const tPlanSelected = getLng(
    planSelected,
    locale?.toUpperCase() || 'TH',
    true
  )

  const {
    isOpen: isShowPlanModal,
    open: openPlanModal,
    close: closePlanModal
  } = useDisclosure()

  const handlePlanTypeChange = (
    dataList: IJobinfoPlan[],
    planTypeId: number
  ) => {
    const planListOptionsTmp = [] as IOptions[]
    dataList
      .filter((row) => row.planType.id === planTypeId)
      .forEach((row) => {
        const tJobInfo = getLng(row, locale?.toUpperCase() || 'TH', true)
        planListOptionsTmp.push({
          value: row.id,
          label: tJobInfo('name') ?? '-'
        })
      })
    setPlanListOptions(planListOptionsTmp)
    setPlanSelected(data?.find(({ id }) => id === planListOptionsTmp[0]?.value))
  }

  const handlePlanChange = (planId: number) => {
    setPlanIdForm(planId)

    setPlanSelected(data?.find(({ id }) => id === planId))
  }
  useEffect(() => {
    if (data) {
      const planTypeOptionsTmp = [] as IOptions[]
      data.forEach((row) => {
        if (
          !planTypeOptionsTmp.find((item) => item.value === row.planType.id)
        ) {
          planTypeOptionsTmp.push({
            value: row.planType.id,
            label: row.planType.name
          })
        }
      })
      setPlanIdForm(data[0].planType.id)
      setPlanTypeIdForm(data[0].id)
      setPlanTypeOptions(planTypeOptionsTmp)
      handlePlanTypeChange(data, data[0].planType.id)
      setPlanSelected(data[0])
    }
  }, [data])

  return (
    <Container {...props} className='py-5'>
      <Title text={t('jobinfo.projectPlan.title')} underLineColor={theme} />
      <Row className='mt-5'>
        <Col sm={5} className='wrap-text-all'>
          <FormSelect
            label={t('jobinfo.projectPlan.planType')}
            options={planTypeOptions}
            value={planTypeIdForm}
            theme={theme}
            change={(value: IOptions) =>
              handlePlanTypeChange(data as IJobinfoPlan[], Number(value.value))
            }
            instanceId='planType'
          />
          <FormSelect
            label={t('jobinfo.projectPlan.planName')}
            change={(value: IOptions) => handlePlanChange(Number(value.value))}
            options={planListOptions}
            value={planIdForm}
            theme={theme}
            instanceId='planName'
          />
          <div className='font-size-16 text-black py-2 mx-3'>
            {tPlanSelected('description')}
          </div>
        </Col>
        <Col sm={7} className='position-relative align-self-center text-center'>
          {planSelected?.imageUrl && (
            <div className='ratio ratio-fb'>
              <Image
                src={planSelected?.imageUrl}
                layout='fill'
                objectFit='fill'
                alt={tPlanSelected('name')}
                onClick={openPlanModal}
                className='cursor-pointer px-3 px-sm-0'
              />
            </div>
          )}
        </Col>
      </Row>
      <ModalGateway>
        {isShowPlanModal ? (
          <ReactImagesModal onClose={closePlanModal}>
            <Carousel
              views={[
                {
                  source: (planSelected?.imageUrl as string) ?? ''
                }
              ]}
            />
          </ReactImagesModal>
        ) : null}
      </ModalGateway>
    </Container>
  )
}

PropertyPlan.defaultProps = {
  theme: '#000',
  locale: 'th'
}
PropertyPlan.propTypes = {
  theme: PropTypes.string,
  locale: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nameTh: PropTypes.string,
      nameEn: PropTypes.string,
      nameCn: PropTypes.string,
      descriptionTh: PropTypes.string,
      descriptionEn: PropTypes.string,
      descriptionCn: PropTypes.string,
      imageUrl: PropTypes.string.isRequired,
      planType: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
}

export default PropertyPlan
