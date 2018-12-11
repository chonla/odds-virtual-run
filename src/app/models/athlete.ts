export interface Athlete {
  id: number
  firstname: string
  lastname: string
  username: string
  profile: string
  stats: AthleteStats
}

export interface AthleteStats {
  recent: RunningActivity
  recent_run_totals: RunningStats
  all_run_totals: RunningStats
  this_month_run_totals: RunningStats
  this_year_run_totals: RunningStats
}

export interface RunningActivity {
  distance: number
  elapsed_time: number
  moving_time: number
  title: string
  start_date: string
  utf_offset:number
}

export interface RunningStats {
  count: number
  distance: number
  moving_time: number
  elapsed_time: number
  elevation_gain, number
}

