import { ReactNode } from 'react'
import { ImageProps } from 'next/image'
import excLandAndHouse from 'public/assets/images/landing/exclusive/land-and-house.png'
import excAp from 'public/assets/images/landing/exclusive/ap.png'
import excSansiri from 'public/assets/images/landing/exclusive/sansiri.png'
import excQHouse from 'public/assets/images/landing/exclusive/q-house.png'
import excSiameseAsset from 'public/assets/images/landing/exclusive/siamese-asset.png'
import execSyncingha from 'public/assets/images/landing/exclusive/singha.png'
import excAnanda from 'public/assets/images/landing/exclusive/ananda.png'
import excAssetWise from 'public/assets/images/landing/exclusive/asset-wise.png'
import excSena from 'public/assets/images/landing/exclusive/sena.png'
import excRaimonLand from 'public/assets/images/landing/exclusive/raimon-land.png'
import excGrandeAsset from 'public/assets/images/landing/exclusive/grande-asset.png'
import excAbleSsset from 'public/assets/images/landing/exclusive/able-asset.png'
import excMana from 'public/assets/images/landing/exclusive/mana.png'
import excSathaporn from 'public/assets/images/landing/exclusive/sathaporn.png'
import excBuiltLand from 'public/assets/images/landing/exclusive/built-land.png'
import excGrandUnity from 'public/assets/images/landing/exclusive/grand-unity.png'
import excTheNest from 'public/assets/images/landing/exclusive/the-nest.png'
import excMestryleProperty from 'public/assets/images/landing/exclusive/mestryle-property.png'
import excIris from 'public/assets/images/landing/exclusive/iris.png'
import excMqdc from 'public/assets/images/landing/exclusive/mqdc.png'
import excHomeRenovate from 'public/assets/images/landing/exclusive/home-renovate.png'
// @ts-ignore
import companyDetail from '@company/companyDetail.json'

const {
  stepSelectProperty,
  stepAppointment,
  stepCommission,
  benefitSaveTime,
  benefitUpdateNewAssets,
  benefitHighCommissions,
  benefitNotBound,
  benefitFreeTraining,
  benefitNoHassle,
  stepShare1,
  stepShare2,
  stepShare3,
  stepShare4
} = companyDetail.landingImages

interface IBenefits {
  key: string
  titleTH: ReactNode | string
  titleEN: ReactNode | string
  titleCN: ReactNode | string
  descriptionTH?: string
  descriptionEN?: string
  descriptionCN?: string
  image: ImageProps
}

interface ISteps extends IBenefits {
  step: number
}

interface IExclusive {
  image: ImageProps
}

const BENEFITS: IBenefits[] = [
  {
    key: 'benefit-1',
    titleTH: 'ประหยัดเวลา',
    titleEN: 'ประหยัดเวลา.',
    titleCN: 'ประหยัดเวลา',
    image: { src: benefitSaveTime, width: 250, height: 167 },
    descriptionTH: `ไม่ต้องหาทรัพย์หรือดีลกับเจ้าของทรัพย์เอง\n${companyDetail.productNameEn} หาและดีลให้ครบ\nเพียงนำไปปิดการขายเท่านั้น`,
    descriptionEN: `ไม่ต้องหาทรัพย์หรือดีลกับเจ้าของทรัพย์เอง\n${companyDetail.productNameEn} หาและดีลให้ครบ\nเพียงนำไปปิดการขายเท่านั้น.`,
    descriptionCN: `ไม่ต้องหาทรัพย์หรือดีลกับเจ้าของทรัพย์เอง\n${companyDetail.productNameEn} หาและดีลให้ครบ\nเพียงนำไปปิดการขายเท่านั้น`
  },
  {
    key: 'benefit-2',
    titleTH: 'อัปเดตทรัพย์ใหม่\nทุกเดือน',
    titleEN: 'อัปเดตทรัพย์ใหม่\nทุกเดือน',
    titleCN: 'อัปเดตทรัพย์ใหม่\nทุกเดือน',
    image: { src: benefitUpdateNewAssets, width: 250, height: 167 },
    descriptionTH:
      'อัปเดตข้อมูลทรัพย์ใหม่ทุกเดือน\nทั้งคอนโด ทาวน์โฮม บ้านมือหนึ่ง\nและบ้านมือสอง คัดมาให้สุด Exclusive',
    descriptionEN:
      'อัปเดตข้อมูลทรัพย์ใหม่ทุกเดือน\nทั้งคอนโด ทาวน์โฮม บ้านมือหนึ่ง\nและบ้านมือสอง คัดมาให้สุด Exclusive',
    descriptionCN:
      'อัปเดตข้อมูลทรัพย์ใหม่ทุกเดือน\nทั้งคอนโด ทาวน์โฮม บ้านมือหนึ่ง\nและบ้านมือสอง คัดมาให้สุด Exclusive'
  },
  {
    key: 'benefit-3',
    titleTH: 'นายหน้า\nรับค่าคอมมิชชันสูง',
    titleEN: 'นายหน้า\nรับค่าคอมมิชชันสูง',
    titleCN: 'นายหน้า\nรับค่าคอมมิชชันสูง',
    image: { src: benefitHighCommissions, width: 250, height: 167 },
    descriptionTH: `นายหน้าที่ปิดการขายโครงการใน\n${companyDetail.productNameEn} จะได้รับค่าคอมมิชชัน\nเริ่มต้น 2.5% และสูงสุดถึง 6%`,
    descriptionEN: `นายหน้าที่ปิดการขายโครงการใน\n${companyDetail.productNameEn} จะได้รับค่าคอมมิชชัน\nเริ่มต้น 2.5% และสูงสุดถึง 6%`,
    descriptionCN: `นายหน้าที่ปิดการขายโครงการใน\n${companyDetail.productNameEn} จะได้รับค่าคอมมิชชัน\nเริ่มต้น 2.5% และสูงสุดถึง 6%`
  },
  {
    key: 'benefit-4',
    titleTH: 'ไม่ผูกมัดการเป็นนายหน้า',
    titleEN: 'ไม่ผูกมัดการเป็นนายหน้า',
    titleCN: 'ไม่ผูกมัดการเป็นนายหน้า',
    image: { src: benefitNotBound, width: 250, height: 167 },
    descriptionTH:
      'ไม่มีสัญญาผูกมัดการเป็นนายหน้า สามารถ\nเป็นนายหน้าอิสระ หรือนายหน้าอสังหาฯ\nให้กับเจ้าของทรัพย์อื่นได้',
    descriptionEN:
      'ไม่มีสัญญาผูกมัดการเป็นนายหน้า สามารถ\nเป็นนายหน้าอิสระ หรือนายหน้าอสังหาฯ\nให้กับเจ้าของทรัพย์อื่นได้',
    descriptionCN:
      'ไม่มีสัญญาผูกมัดการเป็นนายหน้า สามารถ\nเป็นนายหน้าอิสระ หรือนายหน้าอสังหาฯ\nให้กับเจ้าของทรัพย์อื่นได้'
  },
  {
    key: 'benefit-5',
    titleTH: 'ฟรี! คอร์สอบรมนายหน้า',
    titleEN: 'ฟรี! คอร์สอบรมนายหน้า',
    titleCN: 'ฟรี! คอร์สอบรมนายหน้า',
    image: { src: benefitFreeTraining, width: 250, height: 167 },
    descriptionTH:
      'เพิ่มทักษะการเป็นนายหน้าอสังหาฯ\nยุคใหม่ ด้วยคอร์สอบรมและ Workshop\nตลอดปี โดยไม่เสียค่าใช้จ่าย',
    descriptionEN:
      'เพิ่มทักษะการเป็นนายหน้าอสังหาฯ\nยุคใหม่ ด้วยคอร์สอบรมและ Workshop\nตลอดปี โดยไม่เสียค่าใช้จ่าย',
    descriptionCN:
      'เพิ่มทักษะการเป็นนายหน้าอสังหาฯ\nยุคใหม่ ด้วยคอร์สอบรมและ Workshop\nตลอดปี โดยไม่เสียค่าใช้จ่าย'
  },
  {
    key: 'benefit-6',
    titleTH: 'ไม่ยุ่งยากเรื่องเอกสาร',
    titleEN: 'ไม่ยุ่งยากเรื่องเอกสาร',
    titleCN: 'ไม่ยุ่งยากเรื่องเอกสาร',
    image: { src: benefitNoHassle, width: 250, height: 167 },
    descriptionTH: `${companyDetail.productNameEn} จัดเตรียมและ\nดำเนินการเรื่องเอกสารให้ครบทุกกระบวนการฟรี\nนายหน้าทำเพียงปิดการขายเท่านั้น`,
    descriptionEN: `${companyDetail.productNameEn} จัดเตรียมและ\nดำเนินการเรื่องเอกสารให้ครบทุกกระบวนการฟรี\nนายหน้าทำเพียงปิดการขายเท่านั้น`,
    descriptionCN: `${companyDetail.productNameEn} จัดเตรียมและ\nดำเนินการเรื่องเอกสารให้ครบทุกกระบวนการฟรี\nนายหน้าทำเพียงปิดการขายเท่านั้น`
  }
]

const STEPS: ISteps[] = [
  {
    key: 'step-1',
    step: 1,
    image: { src: stepSelectProperty, width: 180, height: 180 },
    titleTH: 'คัดทรัพย์',
    titleEN: 'คัดทรัพย์.',
    titleCN: 'คัดทรัพย์',
    descriptionTH: `เลือกและนำข้อมูลทรัพย์ที่ต้องการทั้ง คอนโด\nทาวน์โฮม บ้านมือหนึ่ง และบ้านมือสอง บน\n${companyDetail.productNameEn} ไปนำเสนอลูกค้าหรือทำตลาด`,
    descriptionEN: `เลือกและนำข้อมูลทรัพย์ที่ต้องการทั้ง คอนโด\nทาวน์โฮม บ้านมือหนึ่ง และบ้านมือสอง บน\n${companyDetail.productNameEn} ไปนำเสนอลูกค้าหรือทำตลาด`,
    descriptionCN: `เลือกและนำข้อมูลทรัพย์ที่ต้องการทั้ง คอนโด\nทาวน์โฮม บ้านมือหนึ่ง และบ้านมือสอง บน\n${companyDetail.productNameEn} ไปนำเสนอลูกค้าหรือทำตลาด`
  },
  {
    key: 'step-2',
    step: 2,
    image: { src: stepAppointment, width: 180, height: 180 },
    titleTH: 'นัดหมาย',
    titleEN: 'นัดหมาย.',
    titleCN: 'นัดหมาย',
    descriptionTH:
      'เมื่อมีผู้สนใจเข้าชมทรัพย์ ให้กดปุ่มนัดหมาย\nเพื่อระบุวันและเวลาที่นายหน้าและ\nผู้สนใจทรัพย์ต้องการเข้าชมทรัพย์',
    descriptionEN:
      'เมื่อมีผู้สนใจเข้าชมทรัพย์ ให้กดปุ่มนัดหมาย\nเพื่อระบุวันและเวลาที่นายหน้าและ\nผู้สนใจทรัพย์ต้องการเข้าชมทรัพย์',
    descriptionCN:
      'เมื่อมีผู้สนใจเข้าชมทรัพย์ ให้กดปุ่มนัดหมาย\nเพื่อระบุวันและเวลาที่นายหน้าและ\nผู้สนใจทรัพย์ต้องการเข้าชมทรัพย์'
  },
  {
    key: 'step-3',
    step: 3,
    image: { src: stepCommission, width: 180, height: 180 },
    titleTH: 'จ่ายค่าคอมมิชชัน',
    titleEN: 'จ่ายค่าคอมมิชชัน.',
    titleCN: 'จ่ายค่าคอมมิชชัน',
    descriptionTH:
      `นายหน้าที่ปิดการขายได้ ${companyDetail.productNameEn}\nจะช่วยดำเนินการในส่วนเอกสารและการยื่น\n` +
      'ขอสินเชื่อให้ โดยเมื่อทำการโอนกรรมสิทธิ์เรียบร้อย\nนายหน้าจะได้รับค่าคอมมิชชันภายใน\n' +
      '30-45 วันทำการ',
    descriptionEN:
      `นายหน้าที่ปิดการขายได้ ${companyDetail.productNameEn}\nจะช่วยดำเนินการในส่วนเอกสารและการยื่น\n` +
      'ขอสินเชื่อให้ โดยเมื่อทำการโอนกรรมสิทธิ์เรียบร้อย\nนายหน้าจะได้รับค่าคอมมิชชันภายใน\n' +
      '30-45 วันทำการ',
    descriptionCN:
      `นายหน้าที่ปิดการขายได้ ${companyDetail.productNameEn}\nจะช่วยดำเนินการในส่วนเอกสารและการยื่น\n` +
      'ขอสินเชื่อให้ โดยเมื่อทำการโอนกรรมสิทธิ์เรียบร้อย\nนายหน้าจะได้รับค่าคอมมิชชันภายใน\n' +
      '30-45 วันทำการ'
  }
]

const STEPS_SHARE: ISteps[] = [
  {
    key: 'step-share-1',
    step: 1,
    image: { src: stepShare1, width: 220, height: 440 },
    titleTH: `สมัครเข้าใช้งานที่\n${companyDetail.websiteLink}`,
    titleEN: `สมัครเข้าใช้งานที่\n${companyDetail.websiteLink}`,
    titleCN: `สมัครเข้าใช้งานที่\n${companyDetail.websiteLink}`
  },
  {
    key: 'step-share-2',
    step: 1,
    image: { src: stepShare2, width: 220, height: 440 },
    titleTH: 'เลือกโครงการ\nและโปรโมชั่นที่สนใจ',
    titleEN: 'เลือกโครงการ\nและโปรโมชั่นที่สนใจ.',
    titleCN: 'เลือกโครงการ\nและโปรโมชั่นที่สนใจ'
  },
  {
    key: 'step-share-3',
    step: 1,
    image: { src: stepShare3, width: 220, height: 440 },
    titleTH: 'เลือกช่องทางที่ต้องการ\nตั้งแคปชั่น และกดแชร์',
    titleEN: 'เลือกช่องทางที่ต้องการ\nตั้งแคปชั่น และกดแชร์.',
    titleCN: 'เลือกช่องทางที่ต้องการ\nตั้งแคปชั่น และกดแชร์'
  },
  {
    key: 'step-share-4',
    step: 1,
    image: { src: stepShare4, width: 220, height: 440 },
    titleTH: 'รอรับส่วนแบ่ง หาก\nลิงก์ที่แชร์ปิดการขายได้',
    titleEN: 'รอรับส่วนแบ่ง หาก\nลิงก์ที่แชร์ปิดการขายได้.',
    titleCN: 'รอรับส่วนแบ่ง หาก\nลิงก์ที่แชร์ปิดการขายได้'
  }
]

const EXCLUSIVE_ASSETS: IExclusive[] = [
  { image: { src: excLandAndHouse, width: 142, height: 35 } },
  { image: { src: excAp, width: 76, height: 76 } },
  { image: { src: excSansiri, width: 126, height: 65 } },
  { image: { src: excQHouse, width: 161, height: 54 } },
  { image: { src: excSiameseAsset, width: 70, height: 74 } },
  { image: { src: execSyncingha, width: 135, height: 53 } },
  { image: { src: excAnanda, width: 106, height: 66 } },
  { image: { src: excAssetWise, width: 96, height: 62 } },
  { image: { src: excSena, width: 110, height: 68 } },
  { image: { src: excRaimonLand, width: 90, height: 72 } },
  { image: { src: excGrandeAsset, width: 123, height: 70 } },
  { image: { src: excAbleSsset, width: 135, height: 70 } },
  { image: { src: excMana, width: 104, height: 77 } },
  { image: { src: excSathaporn, width: 93, height: 74 } },
  { image: { src: excBuiltLand, width: 74, height: 63 } },
  { image: { src: excGrandUnity, width: 78, height: 66 } },
  { image: { src: excTheNest, width: 121, height: 69 } },
  { image: { src: excMestryleProperty, width: 137, height: 74 } },
  { image: { src: excIris, width: 132, height: 64 } },
  { image: { src: excMqdc, width: 132, height: 59 } },
  { image: { src: excHomeRenovate, width: 68, height: 66 } }
]

export { BENEFITS, STEPS, STEPS_SHARE, EXCLUSIVE_ASSETS }
