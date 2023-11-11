interface IQa {
  question: string
  answers: string[]
  highlight?: boolean
}

const QA_LIST_TH: IQa[] = [
  {
    question: 'Prop2Share คืออะไร',
    answers: [
      'Prop2Share คือ โปรแกรมที่สามารถสร้างรายได้ให้กับทุกคนแบบง่ายๆ เพียงแค่คุณแชร์ ทางทีม Prop2Share เปิดโอกาสให้ทุกคนร่วมเป็น Partner เพื่อสร้าง Content บนหน้าโซเชียลของคุณเอง ไม่ว่าจะเป็นการริวิวหรือบอกต่อ ทั้งประกาศโครงการอสังหาฯ โปรโมชั่น และ แคมเปญที่น่าสนใจ เพียงนำลิงก์ของคุณไปวาง ทุกยอดขายจากลิงก์คุณ รับส่วนแบ่งการขายไปเลย! เป็นการหารายได้แบบไม่ต้องลงทุน แถมเพื่อนได้อสังหาฯ เราได้ส่วนแบ่งการขาย'
    ]
  },
  {
    question: 'อัตราส่วนแบ่งงานขาย',
    answers: [
      '1. ในกรณีที่มีการปิดการขายกับลูกค้าที่สนใจผ่านลิงก์ที่แชร์ อัตราส่วนแบ่งงานขาย (ประเภท Incentive) ที่ท่านจะได้รับ จะอยู่ที่ ล้านละ 2,500 บาท ต่อมูลค่าที่มีการปิดการขาย',
      '2. ในกรณีที่มีการปิดการขายจากการที่ทำนัดให้กับลูกค้าผ่านระบบและเจ้าหน้าที่โดยตรง อัตราส่วนแบ่งงานขาย  (ประเภท Commission) ที่ท่านจะได้รับ จะอยู่ที่ 2%-3% ต่อมูลค่าที่มีการปิดการขาย (แตกต่างกันตามโครงการ)'
    ],
    highlight: true
  },
  {
    question: 'วิธีการรับเงิน Incentive กับ Commission',
    answers: [
      'การชำระเงินจะกระทำโดยการโอนเงินเข้าสู่บัญชีของนายหน้า โดยเมื่อมีการปิดการขายขึ้น เจ้าหน้าที่ จะทำการติดต่อกลับเพื่อทำการขอรายละเอียดการโอนเงินส่วนแบ่งการขายนี้ภายใน 7 วัน'
    ],
    highlight: true
  },
  {
    question: 'วิธีการทำงานของ Prop2Share แบบนายหน้าพาลูกค้ามาปิดการขาย',
    answers: [
      '1. เลือกและนำข้อมูลทรัพย์ที่ต้องการบน Prop2Share ไปนำเสนอลูกค้าหรือทำตลาด',
      '2. เมื่อมีผู้สนใจเข้าชมทรัพย์ ให้กดปุ่มนัดหมาย เพื่อระบุวันและเวลาที่นายหน้าและผู้สนใจทรัพย์ต้องการเข้าชมทรัพย์',
      '3. นายหน้าที่ปิดการขายได้ Prop2Share จะช่วยดำเนินการในส่วนเอกสารและการยื่นขอสินเชื่อให้ โดยเมื่อทำการโอนกรรมสิทธิ์เรียบร้อย นายหน้าจะได้รับค่าคอมมิชชันภายใน 30 - 45 วันทำการ'
    ]
  },
  {
    question: 'วิธีการทำงานของ Prop2Share แบบแชร์',
    answers: [
      '1. Login : ล็อกอินเข้ามาในระบบ Prop2Share และเชื่อมกับโซเชียลต่าง ๆ ของคุณ',
      '2. Share link : เลือกโครงการที่สนใจและกดแชร์ลิงก์ เพื่อนำลิงก์ที่ได้ไปแชร์บนหน้าโซเชียลของคุณ',
      '3. Earn Incentive หรือ Commission : รอรับค่าส่วนแบ่งงานขาย เมื่อมีการปิดการขายจากลิงก์ของคุณ'
    ]
  },
  {
    question: 'ขั้นตอนการให้บริการช่วยเหลือนายหน้า',
    answers: [
      '1. เรามีบริการส่งอีเมลเมื่อมีการอัปเดตของจำนวนคนที่สนใจและทำการกรอกข้อมูล ของโครงการที่มาจากการแชร์ของคุณ โดยจะสรุปผลเป็นรายวันถ้ามีการอัปเดต',
      '2. บริการส่งอีเมลแจ้งสถานะ เมื่อมีการเข้าเยี่ยมชมโครงการ การจอง การโอนเกิดขึ้น โดยมีที่มาจากการแชร์ของคุณ รวมถึงแจ้งสถานะการยุติกระบวนการซื้อขายเมื่อผู้ซื้อเกิดปัญหาในการโอนทรัพย์ ทั้งนี้เพื่อความโปร่งใสระบบยังแจ้งข้อมูลติดต่อของเจ้าหน้าที่ฝ่ายขายที่ดูแลลูกค้าจากการแชร์ของคุณ ',
      '3. บริการส่งอีเมลแจ้งสรุปยอดส่วนแบ่งการขาย เมื่อมีการปิดการขายเกิดขึ้น โดยมีที่มาจากการแชร์ของคุณ รวมถึงแจ้งจำนวนของค่า Incentive หรือ Commission ที่ได้จากการขายครั้งนี้'
    ]
  },
  // {
  //   question: 'ฉันควรแชร์บ่อยครั้งแค่ไหน',
  //   answers: [
  //     'คุณสามารถแชร์โครงการจาก Prop2Share กี่ครั้งก็ได้ แต่เราแนะนำว่าสำหรับโครงการที่คุณเคยแชร์ไปแล้ว อาทิตย์ละรอบเป็นการแชร์ที่แนะนำ สำหรับกรณีโครงการที่ยังไม่เคยได้แชร์ แนะนำให้แชร์ได้เลยทันที'
  //   ]
  // },
  {
    question: 'ฉันไม่ได้รับอีเมลจาก Prop2Share',
    answers: [
      'ลองเช็คที่กล่อง spam ในบัญชีอีเมลของคุณ บางครั้งอีเมลที่ส่งอัตโนมัติของเราอาจเข้าไปอยู่ในกล่อง spam'
    ]
  },
  {
    question:
      'ฉันต้องการเปลี่ยนเบอร์โทรศัพท์หรืออีเมลที่ใช้ติดต่อกับเจ้าหน้าที่',
    answers: [
      'คุณสามารถเปลี่ยนเบอร์โทรศัพท์หรืออีเมลที่ใช้ติดต่อกับเจ้าหน้าที่ได้ที่หน้า "บัญชีของฉัน" ',
      'หรือ https://prop2share.com/account'
    ]
  },
  {
    question: 'ไม่มีเจ้าหน้าที่ติดต่อฉันเมื่อมีการปิดการขาย',
    answers: [
      'คุณอาจไม่ได้กรอกเบอร์โทรติดต่อ หรือเจ้าหน้าที่ไม่สามารถติดต่อคุณได้ผ่านทางอีเมล',
      '1. ลองเช็คที่กล่อง spam ในบัญชีอีเมลของคุณ อาจมีเจ้าหน้าที่ติดต่อกลับหาคุณแล้วแต่อีเมลตกอยู่ในกล่อง spam',
      '2. คุณสามารถเช็คเบอร์โทรศัพท์หรืออีเมลที่ใช้ติดต่อกับเจ้าหน้าที่ได้ที่หน้า "บัญชีของฉัน" ',
      '   หรือ https://prop2share.com/account'
    ]
  },
  {
    question: 'ทำอย่างไรเพื่อให้มั่นใจในการติดตามสถานะของ Lead ที่มาจากคุณ',
    answers: [
      'หากมีคำถามเกี่ยวกับสถานะการขายของรายชื่อที่มาโพสของคุณ พร้อมแจ้งรหัสรายชื่อ ส่งทางอีเมลได้ที่ contact@prop2share.com จะมีเจ้าหน้าที่ตอบกลับ'
    ]
  },
  // {
  //   question: 'การสมัครเข้าใช้งาน Prop2Share มีค่าใช้จ่ายหรือไม่',
  //   answers: [
  //     'การสมัครเข้าใช้งาน Prop2Share ไม่มีค่าใช้จ่ายใดๆ เมื่อสมัครเป็นสมาชิกกับเรา คุณจะได้รับค่าส่วนแบ่งงานขายเมื่อมีการปิดการขายในโครงการที่ท่านเป็นผู้แชร์ คุณเพียงแค่ใช้ลิงก์ไปใส่ใน Content ที่คุณสร้าง จากนั้น Prop2Share จะดูแลขั้นตอนการขายต่อจากนั้นให้เอง'
  //   ]
  // },
  {
    question: 'สามารถติดต่อกับ Prop2Share ได้อย่างไร',
    answers: ['สามารถติดต่อทางอีเมลได้ที่ contact@prop2share.com']
  },
  {
    question:
      'ฉันสามารถนำลิงก์แชร์ลงในเว็บไซต์ส่วนตัว หรือแพลตฟอร์มโซเชียลมีเดียอื่น ๆ นอกจากที่ทาง Prop2Share เตรียมไว้ให้ได้หรือไม่',
    answers: [
      'ทำได้ โดยโดยคุณสามารถกด Copy ลิงก์ที่ขึ้นในหน้าต่างแชร์โครงการ ไปจัดทำ Content ต่างๆที่คุณต้องการได้ โดยทุกลิงก์ในระบบ Prop2Share ที่ลงทะเบียนในชื่อคุณ จะเป็นของบัญชีผู้ใช้งานคุณคนเดียวเท่านั้น ไม่ว่าจะถูกนำไปใช้งานในรูปแบบใดก็ตามคุณก็จะได้รับ Incentive เมื่อมีการปิดการขายจากลิงก์ของคุณเสมอ'
    ]
  }
]

const QA_LIST_EN: IQa[] = [
  {
    question: 'What is Prop2Share?',
    answers: [
      "Prop2Share is a real estate platform for real estate agents who want to find assets to close sales with customers. You can come and choose the property you like on our website. And when the property closes the sale, then receives a commission for closing the sale. In addition, Prop2Share is a program that can make money for everyone easily. Just by sharing, the Prop2Share team gives everyone the opportunity to become a partner to create content on your own social page. Whether it's a review or spread the word including announcements of real estate projects, promotions and interesting campaigns Just paste your link. Every sale from your link get your share of the sale! It is an income earning without investment. Plus, friends get real estate. We get a share of sales."
    ]
  },
  {
    question: 'Sales comission and share rate ',
    answers: [
      '1. In the event that sales are closed from making appointments for customers through the system or Prop2Share Team directly.The commission  that you will receive will be displayed on the project card, usually 2%-3% of the closed sale value. (varies by project)',
      '2. In the event that a sale is closed with an interested customer via shared link. The share rate of sales (Incentive type) that you will receive will be at 2,500 baht per million per closed sale value."'
    ],
    highlight: true
  },
  {
    question: 'How to Earn Incentives with Commission',
    answers: [
      "Payments are made by transferring money to the agent's account. When the sale is closed, the Prop2Share's Team will contact you to ask for details of the transfer of the sale share within 7 days"
    ],
    highlight: true
  },
  {
    question:
      'How Prop2Share works as a agent brings customers to close sales.',
    answers: [
      '1. Select and bring the desired property information on Prop2Share to customers or market.',
      '2. When customer is interested in visiting the property, press the appointment button to specify the date and time when the you and your customer want to visit the property',
      '3. Agents who can close the sale, Prop2Share will help with the paperwork and loan application. when the ownership transfer has been completed Brokers will receive their commission within 30 - 45 working days.'
    ]
  },
  {
    question: 'How the shared Prop2Share works',
    answers: [
      '1. Login : Log in to the Prop2Share system and connect with your social media.',
      '2. Share link : Choose a project that interests you and press share link. to take the link that has been shared on your social pages',
      '3. Earn Incentive or Commission: Wait for a share of sales. when a sale is closed from your link'
    ]
  },
  {
    question: 'Procedures for providing assistance to brokers',
    answers: [
      '1. We provide an email service when there is an update on the number of people interested and filling in information of projects from your sharing. It will summarize the results on a daily basis if there is an update.',
      '2. E-mail notification service , When a project visit, booking or transfer from the origin of your share Including informing the status of terminating the trading process when the buyer has problems transferring assets. For transparency, the contact information of the customer care salesperson from your share is also provided.',
      '3. E-mail service for summary of sales share When a sale is closed with the origin of your share Including informing the amount of Incentive or Commission received from this sale.'
    ]
  },
  // {
  //   question: 'ฉันควรแชร์บ่อยครั้งแค่ไหน',
  //   answers: [
  //     'คุณสามารถแชร์โครงการจาก Prop2Share กี่ครั้งก็ได้ แต่เราแนะนำว่าสำหรับโครงการที่คุณเคยแชร์ไปแล้ว อาทิตย์ละรอบเป็นการแชร์ที่แนะนำ สำหรับกรณีโครงการที่ยังไม่เคยได้แชร์ แนะนำให้แชร์ได้เลยทันที'
  //   ]
  // },
  {
    question: "I'm not receiving emails from Prop2Share.",
    answers: [
      'Check the spam box in your email account. Sometimes our automated emails may end up in the spam box.'
    ]
  },
  {
    question:
      'I want to change the phone number or email address used to contact the agent.',
    answers: [
      'You can change the phone number or email on the page. "My Account" or https://prop2share.com/account'
    ]
  },
  {
    question: "Don't have anyone contacted me once the sale was closed.",
    answers: [
      "You may not have entered a contact number. Or the staff can't contact you via email.",
      '1. Check the spam box in your email account. Someone may have contacted you back but your email is in the spam box.',
      '2. You can check the phone number or email  at the page. "My Account" or https://prop2share.com/account'
    ]
  },
  {
    question: 'How to Ensure Tracking of Leads Coming From share?',
    answers: [
      'If you have questions about the sales status of your share ,Please contact email at contact@prop2share.com'
    ]
  },
  // {
  //   question: 'การสมัครเข้าใช้งาน Prop2Share มีค่าใช้จ่ายหรือไม่',
  //   answers: [
  //     'การสมัครเข้าใช้งาน Prop2Share ไม่มีค่าใช้จ่ายใดๆ เมื่อสมัครเป็นสมาชิกกับเรา คุณจะได้รับค่าส่วนแบ่งงานขายเมื่อมีการปิดการขายในโครงการที่ท่านเป็นผู้แชร์ คุณเพียงแค่ใช้ลิงก์ไปใส่ใน Content ที่คุณสร้าง จากนั้น Prop2Share จะดูแลขั้นตอนการขายต่อจากนั้นให้เอง'
  //   ]
  // },
  {
    question: 'How can I contact Prop2Share?',
    answers: ['You can contact us via email at contact@prop2share.com']
  },
  {
    question:
      'Can I put a share link on my personal website? Or any other social media platform besides what Prop2Share provides?',
    answers: [
      'You can do that by clicking Copy the link that appears in the share project window to create the content you want. By every link in the Prop2Share system registered in your name. It will only belong to your user account. No matter how it is used, you will always receive incentives when a sale is closed from your links.'
    ]
  }
]

const QA_LIST_CN: IQa[] = [
  {
    question: 'What is Prop2Share?',
    answers: [
      "Prop2Share is a real estate platform for real estate agents who want to find assets to close sales with customers. You can come and choose the property you like on our website. And when the property closes the sale, then receives a commission for closing the sale. In addition, Prop2Share is a program that can make money for everyone easily. Just by sharing, the Prop2Share team gives everyone the opportunity to become a partner to create content on your own social page. Whether it's a review or spread the word including announcements of real estate projects, promotions and interesting campaigns Just paste your link. Every sale from your link get your share of the sale! It is an income earning without investment. Plus, friends get real estate. We get a share of sales."
    ]
  },
  {
    question: 'Sales comission and share rate ',
    answers: [
      '1. In the event that sales are closed from making appointments for customers through the system or Prop2Share Team directly.The commission  that you will receive will be displayed on the project card, usually 2%-3% of the closed sale value. (varies by project)',
      '2. In the event that a sale is closed with an interested customer via shared link. The share rate of sales (Incentive type) that you will receive will be at 2,500 baht per million per closed sale value."'
    ],
    highlight: true
  },
  {
    question: 'How to Earn Incentives with Commission',
    answers: [
      "Payments are made by transferring money to the agent's account. When the sale is closed, the Prop2Share's Team will contact you to ask for details of the transfer of the sale share within 7 days"
    ],
    highlight: true
  },
  {
    question:
      'How Prop2Share works as a agent brings customers to close sales.',
    answers: [
      '1. Select and bring the desired property information on Prop2Share to customers or market.',
      '2. When customer is interested in visiting the property, press the appointment button to specify the date and time when the you and your customer want to visit the property',
      '3. Agents who can close the sale, Prop2Share will help with the paperwork and loan application. when the ownership transfer has been completed Brokers will receive their commission within 30 - 45 working days.'
    ]
  },
  {
    question: 'How the shared Prop2Share works',
    answers: [
      '1. Login : Log in to the Prop2Share system and connect with your social media.',
      '2. Share link : Choose a project that interests you and press share link. to take the link that has been shared on your social pages',
      '3. Earn Incentive or Commission: Wait for a share of sales. when a sale is closed from your link'
    ]
  },
  {
    question: 'Procedures for providing assistance to brokers',
    answers: [
      '1. We provide an email service when there is an update on the number of people interested and filling in information of projects from your sharing. It will summarize the results on a daily basis if there is an update.',
      '2. E-mail notification service , When a project visit, booking or transfer from the origin of your share Including informing the status of terminating the trading process when the buyer has problems transferring assets. For transparency, the contact information of the customer care salesperson from your share is also provided.',
      '3. E-mail service for summary of sales share When a sale is closed with the origin of your share Including informing the amount of Incentive or Commission received from this sale.'
    ]
  },
  // {
  //   question: 'ฉันควรแชร์บ่อยครั้งแค่ไหน',
  //   answers: [
  //     'คุณสามารถแชร์โครงการจาก Prop2Share กี่ครั้งก็ได้ แต่เราแนะนำว่าสำหรับโครงการที่คุณเคยแชร์ไปแล้ว อาทิตย์ละรอบเป็นการแชร์ที่แนะนำ สำหรับกรณีโครงการที่ยังไม่เคยได้แชร์ แนะนำให้แชร์ได้เลยทันที'
  //   ]
  // },
  {
    question: "I'm not receiving emails from Prop2Share.",
    answers: [
      'Check the spam box in your email account. Sometimes our automated emails may end up in the spam box.'
    ]
  },
  {
    question:
      'I want to change the phone number or email address used to contact the agent.',
    answers: [
      'You can change the phone number or email on the page. "My Account" or https://prop2share.com/account'
    ]
  },
  {
    question: "Don't have anyone contacted me once the sale was closed.",
    answers: [
      "You may not have entered a contact number. Or the staff can't contact you via email.",
      '1. Check the spam box in your email account. Someone may have contacted you back but your email is in the spam box.',
      '2. You can check the phone number or email  at the page. "My Account" or https://prop2share.com/account'
    ]
  },
  {
    question: 'How to Ensure Tracking of Leads Coming From share?',
    answers: [
      'If you have questions about the sales status of your share ,Please contact email at contact@prop2share.com'
    ]
  },
  // {
  //   question: 'การสมัครเข้าใช้งาน Prop2Share มีค่าใช้จ่ายหรือไม่',
  //   answers: [
  //     'การสมัครเข้าใช้งาน Prop2Share ไม่มีค่าใช้จ่ายใดๆ เมื่อสมัครเป็นสมาชิกกับเรา คุณจะได้รับค่าส่วนแบ่งงานขายเมื่อมีการปิดการขายในโครงการที่ท่านเป็นผู้แชร์ คุณเพียงแค่ใช้ลิงก์ไปใส่ใน Content ที่คุณสร้าง จากนั้น Prop2Share จะดูแลขั้นตอนการขายต่อจากนั้นให้เอง'
  //   ]
  // },
  {
    question: 'How can I contact Prop2Share?',
    answers: ['You can contact us via email at contact@prop2share.com']
  },
  {
    question:
      'Can I put a share link on my personal website? Or any other social media platform besides what Prop2Share provides?',
    answers: [
      'You can do that by clicking Copy the link that appears in the share project window to create the content you want. By every link in the Prop2Share system registered in your name. It will only belong to your user account. No matter how it is used, you will always receive incentives when a sale is closed from your links.'
    ]
  }
]

export { QA_LIST_TH, QA_LIST_EN, QA_LIST_CN }
