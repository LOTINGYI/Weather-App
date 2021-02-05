import React, { useEffect } from 'react'
import Bar from '../Bar/Bar'

export default function TempBar({ data }) {
   
    useEffect(() => {
      
    }, [data])
    return (
        <div>
         
            <Bar
                datas={data}
                width={300}
                height={200}
                top={10}
                bottom={20}
                left={40}
                right={0}
            />
        </div>
    )
}



