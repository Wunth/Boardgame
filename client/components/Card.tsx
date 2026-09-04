import type { EnvironmentCard } from '../../models/card.ts'
import type { CSSProperties } from 'react'

function Card({
  card,
  onClick,
  style,
}: {
  card: EnvironmentCard
  onClick: (id: number) => void
  style?: CSSProperties
}) {
  return (
    <button
      type="button"
      className={`environment-card ${card.suit} ${card.environmentColour}`}
      onClick={() => onClick(card.id)}
      style={style}
    >
      <span className="suit"></span>
      <span className="environ-colour"></span>
    </button>
  )
}

export default Card
