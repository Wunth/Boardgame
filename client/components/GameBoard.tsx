import { useEnvironmentCards } from '../hooks/useEnvironmentCards.ts'
import { useRecipeCards } from '../hooks/useRecipeCards.ts'
import CardZone from './CardZone.tsx'

function GameBoard() {
  const {
    drawDeck,
    playArea,
    playerFarRow,
    playerNearRow,
    playerHand,
    dealStartingCards,
    dealToFarRow,
    startOver,
  } = useEnvironmentCards()

  const {
    recipeDeck,
    recipeRow,
    dealRecipeRow,
    startOver: startOverRecipes, // to not conflict with GameBoard.startOver
  } = useRecipeCards()

  // placholders
  const handlePlayAreaCardClick = (id: number) => {
    console.log('distance card clicked', id)
  }
  const handleDrawDeckCardClick = (id: number) => {
    console.log('draw deck card clicked', id)
  }
  const handleFarRowCardClick = (id: number) => {
    console.log('Far row card clicked', id)
  }
  const handleNearRowCardClick = (id: number) => {
    console.log('Near row card clicked', id)
  }
  const handleHandCardClick = (id: number) => {
    console.log('Near row card clicked', id)
  }
  const handleRecipeDeckCardClick = (id: number) => {
    console.log('recipe deck card clicked', id)
  }
  const handleRecipeCardClick = (id: number) => {
    console.log('recipe card clicked', id)
  }

  const handleReset = () => {
    startOver()
    startOverRecipes()
  }

  return (
    <div id="game-board">
      <div id="setup-buttons">
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <br />
        <button type="button" onClick={dealStartingCards}>
          Deal distance cards
        </button>
        <br />
        <button type="button" onClick={dealToFarRow}>
          Deal player cards
        </button>
        <button type="button" onClick={dealRecipeRow}>
          Deal recipe cards
        </button>
      </div>

      <div id="distance">
        <CardZone
          id="draw-deck"
          cards={drawDeck}
          onCardClick={handleDrawDeckCardClick}
          // this decrements the z-index with an increasing offset margins, to create the deck
          getCardStyle={(i) => {
            const fromTop = (drawDeck?.length ?? 1) - 1 - i
            return {
              marginLeft: `${fromTop / 4}px`,
              marginTop: `${fromTop / 8}px`,
              zIndex: `${fromTop}`,
            }
          }}
        />
        <CardZone
          id="distance-cards"
          cards={playArea}
          onCardClick={handlePlayAreaCardClick}
        />
      </div>

      <div id="board-lower">
        <div id="player-rows">
          <CardZone
            id="far-row"
            cards={playerFarRow}
            onCardClick={handleNearRowCardClick}
          />
          <CardZone
            id="near-row"
            cards={playerNearRow}
            onCardClick={handleFarRowCardClick}
          />

          <CardZone
            id="hand-cards"
            cards={playerHand}
            onCardClick={handleHandCardClick}
          />
        </div>
      </div>
      <div id="transmutation-zone">
        <div id="recipe-slot-markers">
          <div className="recipe-marker red" />
          <div className="recipe-marker blue" />
          <div className="recipe-marker green" />
          <div className="recipe-marker yellow" />
          <div className="recipe-marker white" />
        </div>

        <div id="recipe-deck">
          {recipeDeck?.map((card, i) => {
            const fromTop = (recipeDeck?.length ?? 1) - 1 - i
            return (
              <button
                key={card.id}
                type="button"
                className="recipe-card"
                onClick={() => handleRecipeDeckCardClick(card.id)}
                style={{
                  marginLeft: `${fromTop / 4}px`,
                  marginTop: `${fromTop / 8}px`,
                  zIndex: fromTop,
                }}
              >
                <div className="recipe-card-gems">
                  {card.gems.map((gem, gi) => (
                    <span key={gi} className={gem} />
                  ))}
                </div>
              </button>
            )
          })}
        </div>

        <div id="recipe-cards">
          {recipeRow?.map((card) => (
            <button
              key={card.id}
              type="button"
              className="recipe-card"
              onClick={() => handleRecipeCardClick(card.id)}
            >
              <div className="recipe-card-gems">
                {card.gems.map((gem, gi) => (
                  <span key={gi} className={gem} />
                ))}
              </div>
            </button>
          ))}
        </div>

        <div id="suit-cards">
          <div className="suit-entry">
            <div className="suit-card hearts" />
            <div className="token-slot" />
          </div>
          <div className="suit-entry">
            <div className="suit-card diamonds" />
            <div className="token-slot" />
          </div>
          <div className="suit-entry">
            <div className="suit-card clubs" />
            <div className="token-slot" />
          </div>
          <div className="suit-entry">
            <div className="suit-card spades" />
            <div className="token-slot" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameBoard
