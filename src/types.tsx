export interface Player {
    id: number;
    ranking: number;
    schoolLogo: string;
    school: string;
    playerImage: string;
    firstname: string;
    lastname: string;
    position: string;
    year: string;
    draftPick?: DraftPick

  }
  
  export interface DraftPick {
    id: number;
    round: number;
    pick: number;
    teamId: number;
    team: Team;
    playerId?: number;
    player?: Player;
}

export interface Team {
    id: number;
    name: string;
    logo: string;
    draftPicks: DraftPick[];
}