import { FiLoader } from 'react-icons/fi'

export default function Loading() {
  return (
    <div className="flex justify-center items-center mt-12">
      <FiLoader size={32} className="animate-spin" />
    </div>
  )
}
