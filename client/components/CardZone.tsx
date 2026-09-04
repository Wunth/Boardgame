import type { EnvironmentCard } from '../../models/card.ts'
import Card from './Card.tsx'
import type { CSSProperties } from 'react'

function CardZone({
  id,
  cards,
  onCardClick,
  getCardStyle,
}: {
  id: string
  cards: EnvironmentCard[] | undefined
  onCardClick: (id: number) => void
  getCardStyle?: (index: number) => CSSProperties
}) {
  return (
    <div id={id}>
      {cards &&
        cards.map((eCard, i) => (
          <Card
            key={eCard.id}
            card={eCard}
            onClick={onCardClick}
            style={getCardStyle?.(i)}
          />
        ))}
    </div>
  )
}

export default CardZone
