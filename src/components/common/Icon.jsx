import * as icons from 'lucide-react'

/**
 * Nomi bo'yicha lucide ikonkasini render qiladi.
 * Ma'lumot fayllarida ikonka nomi satr sifatida saqlanadi.
 */
export function Icon({ name, size = 18, ...rest }) {
  const Cmp = icons[name] || icons.Circle
  return <Cmp size={size} aria-hidden="true" {...rest} />
}

export default Icon
