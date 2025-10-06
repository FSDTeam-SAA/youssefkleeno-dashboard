import React from 'react'
import EditComponents from './_components/editComponents'

const page = ({params: {id}}: {params: {id: string}}) => {
  return (
    <div>
        <EditComponents id={id}/>
    </div>
  )
}

export default page