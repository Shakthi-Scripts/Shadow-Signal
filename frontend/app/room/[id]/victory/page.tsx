import VictoryButton from '@/app/components/VictoryButton'
import VictoryHeader from '@/app/components/VictoryHeader'
import VictoryNavBar from '@/app/components/VictoryNavBar'
import VictorySummary from '@/app/components/VictorySummary'
import React from 'react'

function page() {
    return (
        <div className="min-h-screen bg-[rgb(15,35,32)]">
            <VictoryNavBar/>
            <VictoryHeader/>
            <VictorySummary/>
            <VictoryButton/>
        </div>
    )
}

export default page
