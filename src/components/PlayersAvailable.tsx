import { useLocation } from "@solidjs/router";

type PlayersAvailableProps = {
  firstname: string;
  lastname?: string;
  ranking: number;
  school: string;
  position: string;
  schoolLogo: string;
  playerImage: string;
  year: string;
  onDraft: (player: PlayersAvailableProps) => void;
};

function PlayersAvailable(props: PlayersAvailableProps) {
  const location = useLocation();
  const active = (path: string) =>
    path === location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

  const handleDraft = () => {
    props.onDraft(props);
  };

  return (
    <div
      class={`rt-tr rt-tr-highlight ${active(props.firstname)} flex items-center cursor-pointer`}
      role="row"
      style="flex: 1 0 auto; min-width: 915px;"
      onClick={handleDraft}
    >
      <div class="rt-td rt-align-center flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 38px; width: 38px; max-width: 38px;">
        <div class="rt-td-inner">{props.ranking}</div>
      </div>
      <div class="rt-td rt-align-center flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 42px; width: 42px; max-width: 42px;">
        <div class="rt-td-inner">
          <img src={props.schoolLogo} height="35px" width="35px" alt={props.school} />
        </div>
      </div>
      <div class="rt-td rt-align-center flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 52px; width: 52px; max-width: 52px;">
        <div class="rt-td-inner">
          <img src={props.playerImage} height="35px" alt={props.firstname} />
        </div>
      </div>
      <div class="rt-td rt-align-center flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 48px; width: 48px; max-width: 48px;">
        <div class="rt-td-inner">
          <div class="rt-text-content" style="display: inline;">
            <div style="line-height:12px"><span style="font-weight:bold;font-size:14px">{props.position}</span></div>
            <div style="line-height:10px"><span style="font-weight:bold;color:grey;font-variant:small-caps;font-size:10px">{props.year}</span></div>
          </div>
        </div>
      </div>
      <div class="rt-td rt-align-left flex items-center justify-center" role="cell" style="flex: 0 0 auto; min-width: 95px; width: 95px; max-width: 95px;">
        <div class="rt-td-inner">
          <div class="rt-text-content" style="display: inline;">
            <div style="line-height:12px"><span style="font-weight:bold;color:grey;font-size:10px">{props.firstname}</span></div>
            {props.lastname && (
              <div style="line-height:10px"><span style="font-weight:bold;font-variant:small-caps;font-size:14px">{props.lastname}</span></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayersAvailable;
