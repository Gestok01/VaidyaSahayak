'use client';
import React, { useState } from 'react'

const TitleList = ({titleList,setTitleList}) => {
     
  return (
    <div className="flex text-xl p-2">
            {titleList.map((title, idx) => (
              <React.Fragment key={idx}>
                {title.linkTo.length === 0 ? (
                  <span className="text-gray-400">
                    {`${title.name} > `}
                  </span>
                ) : idx === titleList.length - 2 ? (
                  <span className="text-black">{`${title.name} >`}</span>
                ) : (
                  <span>{title.name}</span>
                )}
              </React.Fragment>
            ))}
          </div>
  )
}

export default TitleList;