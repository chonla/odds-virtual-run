export interface Vr {
  link: string
  title: string
  period: string[]
  detail: string
  created_by: number
  created_datetime: string
  engagements: Engagement[]
}

export interface Engagement {
  athlete_id: number
  athlete_name: string
  distance: number
  taken_distance: number
  percent_complete: number
}
