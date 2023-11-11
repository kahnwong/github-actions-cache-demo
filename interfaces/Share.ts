export interface IInsertShare {
  url: string
  agentid: number
  jobId: number
  platform: string
  roomid: number | null
  shareid: number
  createdate: string
  todayShare: number
}

export interface IUpdateShare {
  url: string
  agent: number
  job: number
  plat: string
}
