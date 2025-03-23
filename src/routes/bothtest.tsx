import { createSignal, For, Show, createEffect, createMemo } from "solid-js";
import { createAsyncStore } from "@solidjs/router";
import { getPlayers, getDraftPicks, getTeams } from '~/lib/PlayerApi';
import PlayerCard from '~/components/PlayerCard';
import DraftButton from '~/components/buttons/DraftButton';
import PickCard from '~/components/TeamCard';
import TradeButton from "~/components/buttons/TradeButton";
import { Player } from '../types';

export default function DraftPage() {
  // Load data from APIs
  const players = createAsyncStore(() => getPlayers(), {
    initialValue: [],
  });

  const DraftPicks = createAsyncStore(() => getDraftPicks(), {
    initialValue: [],
  });

  const Teams = createAsyncStore(() => getTeams(), {
    initialValue: [],
  });

  // State for tracking which players have been drafted
  const [draftedPlayers, setDraftedPlayers] = createSignal<{playerId: number, pickId: number}[]>([]);
  
  // State for tracking trade mode
  const [tradeMode, setTradeMode] = createSignal(false);
  const [sourcePickId, setSourcePickId] = createSignal<number | null>(null);
  const [targetPickId, setTargetPickId] = createSignal<number | null>(null);
  
  // Get the next available pick (not yet drafted)
  const getNextAvailablePick = () => {
    const drafted = draftedPlayers();
    const draftedPickIds = drafted.map(dp => dp.pickId);
    
    return DraftPicks().find(pick => !draftedPickIds.includes(pick.id));
  };

  // Get all available future picks (not yet drafted)
  const getAvailableFuturePicks = () => {
    const drafted = draftedPlayers();
    const draftedPickIds = drafted.map(dp => dp.pickId);
    const nextPick = getNextAvailablePick();
    
    if (!nextPick) return [];
    
    // return all picks that come after the next pick and don't have players drafted
    return DraftPicks()
      .filter(pick => 
        !draftedPickIds.includes(pick.id) && 
        (pick.round > nextPick.round || 
         (pick.round === nextPick.round && pick.pick > nextPick.pick))
      );
  };

  // Get pick details by ID (because with autoincrement and DB manipulation the pickid might not be the same as the pick number)
  const getPickDetailsById = (pickId: number) => {
    const pick = DraftPicks().find(p => p.id === pickId);
    if (!pick) return null;
    
    const team = getTeamById(pick.teamId);
    return {
      pickNumber: pick.pick,
      round: pick.round,
      displayName: `R${pick.round} P${pick.pick}`,
      teamName: team?.name || "Unknown Team"
    };
  };

  // Handle drafting a player
  const handleDraft = (playerId: number) => {
    const nextPick = getNextAvailablePick();

    if (nextPick) {
        // Find the drafted player from the players list
        const draftedPlayer = players().find(player => player.id === playerId);
        
        // Log player information
        console.log("Drafted Player Info:", draftedPlayer);

        // Log all draft picks
        console.log("All Draft Picks:", DraftPicks());

        // Update state
        setDraftedPlayers((prev) => [...prev, { playerId, pickId: nextPick.id }]);

        console.log(`Drafted player ${playerId} to pick ${nextPick.id}`);
    } else {
        console.log("All picks have been used!");
    }
  };

  // Handle initiating a trade
  const handleTrade = (pickId: number) => {
    setSourcePickId(pickId);
    setTradeMode(true);
    const pickDetails = getPickDetailsById(pickId);
    console.log(`Initiated trade for ${pickDetails?.displayName}`);
  };

  // Handle selecting a target pick for trade
  const selectTargetForTrade = (pickId: number) => {
    setTargetPickId(pickId);
  };

  // Execute the trade between source and target picks
  const executeTrade = () => {
    const source = sourcePickId();
    const target = targetPickId();
    
    if (source && target) {
      // Create a mutable copy of the picks
      const picks = [...DraftPicks()];
      
      // Find the picks to trade
      const sourcePick = picks.find(pick => pick.id === source);
      const targetPick = picks.find(pick => pick.id === target);
      
      if (sourcePick && targetPick) {
        // Get team information for logging
        const sourceTeam = getTeamById(sourcePick.teamId);
        const targetTeam = getTeamById(targetPick.teamId);
        
        // Swap team IDs
        const sourceTeamId = sourcePick.teamId;
        sourcePick.teamId = targetPick.teamId;
        targetPick.teamId = sourceTeamId;
        
        console.log(`Executed trade: 
          R${sourcePick.round} P${sourcePick.pick} (now ${getTeamById(sourcePick.teamId)?.name}) ↔ 
          R${targetPick.round} P${targetPick.pick} (now ${getTeamById(targetPick.teamId)?.name})`);
        
        // Reset trade mode
        setTradeMode(false);
        setSourcePickId(null);
        setTargetPickId(null);
      }
    }
  };

  // Cancel the trade
  const cancelTrade = () => {
    setTradeMode(false);
    setSourcePickId(null);
    setTargetPickId(null);
  };

  // Get team by ID
  const getTeamById = (teamId: number) => {
    return Teams().find(team => team.id === teamId);
  };

  // Filter available players (not yet drafted)
  const availablePlayers = () => {
    const drafted = draftedPlayers();
    const draftedPlayerIds = drafted.map(dp => dp.playerId);
    
    return players().filter(player => !draftedPlayerIds.includes(player.id));
  };

  // Get the player for a specific pick
  const getPlayerForPick = (pickId: number) => {
    const draftedPick = draftedPlayers().find(dp => dp.pickId === pickId);
    return draftedPick ? players().find(player => player.id === draftedPick.playerId) : undefined;
  };
  
  // Check if a pick is selectable for trade target
  const isSelectableForTrade = (pickId: number) => {
    return tradeMode() && sourcePickId() !== pickId && !getPlayerForPick(pickId);
  };



  return (
    <div class="flex flex-row w-full h-full">
      {/* Left side - Available Players */}
      <div class="w-1/3 p-4 overflow-y-auto" style="max-height: 90vh;">
        <h1 class="text-xl font-bold mb-4">Available Players</h1>
        <div class="player-list space-y-2">
          <For each={availablePlayers()}>
            {(player) => (
              <div class="flex justify-between items-center">
                <PlayerCard player={player} />
                <Show when={!tradeMode()}>
                  <DraftButton playerId={player.id} onDraft={handleDraft} />
                </Show>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Middle Side - Trade Options */}
      <div class="w-1/3 p-4 overflow-y-auto" style="max-height: 90vh;">
        <h1 class="text-xl font-bold mb-4">Trade Options</h1>
        <div class="space-y-4">
          <Show when={!tradeMode()}>
            <div class="bg-gray-100 p-4 rounded-lg">
              <h2 class="font-bold mb-2">Start a Trade</h2>
              <p class="mb-2">Trade the next available pick with another team's future pick.</p>
              <TradeButton
                pickId={getNextAvailablePick()?.id ?? 0}
                onTrade={handleTrade}
                disabled={!getNextAvailablePick()}
              />
            </div>
          </Show>
          
          <Show when={tradeMode()}>
            <div class="bg-amber-100 p-4 rounded-lg">
              <h2 class="font-bold mb-2">Trade in Progress</h2>
              <p class="mb-2">
                {(() => {
                  const pickId = sourcePickId();
                  if (pickId === null) return "Select a pick";
                  const details = getPickDetailsById(pickId);
                  return `Trading ${details?.displayName} (${details?.teamName}) - select a target pick`;
                })()}
              </p>

              
              <Show when={targetPickId()}>
                <div class="mt-4">
                  <p class="font-bold">
                    {(() => {
                      const pickId = targetPickId();
                      return pickId !== null
                        ? `Selected target: ${getPickDetailsById(pickId)?.displayName} (${getPickDetailsById(pickId)?.teamName})`
                        : "No pick selected";
                    })()}
                  </p>
                  <div class="flex space-x-2 mt-2">
                    <button 
                      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={executeTrade}
                    >
                      Confirm Trade
                    </button>
                    <button 
                      class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      onClick={() => setTargetPickId(null)}
                    >
                      Change Selection
                    </button>
                  </div>
                </div>
              </Show>
              
              <button 
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
                onClick={cancelTrade}
              >
                Cancel Trade
              </button>
            </div>
            
            <div class="mt-4">
              <h3 class="font-semibold mb-2">Available Future Picks</h3>
              <div class="space-y-2">
                <For each={getAvailableFuturePicks()}>
                  {(pick) => {
                    const team = getTeamById(pick.teamId);
                    return (
                      <div class="bg-gray-100 p-2 rounded flex justify-between items-center">
                        <div>
                          <span class="font-bold">R{pick.round} P{pick.pick}</span> - {team?.name}
                        </div>
                        <button 
                          class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                          onClick={() => selectTargetForTrade(pick.id)}
                          disabled={targetPickId() === pick.id}
                        >
                          {targetPickId() === pick.id ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>
          </Show>
        </div>
      </div>

      {/* Right side - Teams with Picks */}
      <div class="w-1/3 p-4 overflow-y-auto" style="max-height: 90vh;">
        <h1 class="text-xl font-bold mb-4">Draft Board</h1>
        <div class="space-y-4">
          <For each={DraftPicks()}>
            {(pick) => {
              const team = getTeamById(pick.teamId);
              const draftedPlayer = () => getPlayerForPick(pick.id);
              
              return (
                <div class={`w-full ${sourcePickId() === pick.id ? 'ring-2 ring-blue-500' : ''} 
                             ${targetPickId() === pick.id ? 'ring-2 ring-green-500' : ''}`}>
                  <div class="relative">
                    <PickCard
                      pick={{
                        pickNumber: pick.pick,
                        pickRound: pick.round,
                        pickTeamid: pick.teamId,
                      }}
                      team={{
                        id: team?.id ?? 0,
                        name: team?.name ?? "Unknown",
                        logo: team?.logo ?? ""
                      }}
                      draftedPlayer={draftedPlayer()}
                    />
                    
                    <Show when={isSelectableForTrade(pick.id)}>
                      <button 
                        class="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                        onClick={() => selectTargetForTrade(pick.id)}
                      >
                        Trade Here
                      </button>
                    </Show>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </div>
  );
}