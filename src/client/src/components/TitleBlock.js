import React from 'react'
import '../style/components/title.css'
const TitleBlock = () => {
    return <div className={'title-container'}>
        <div className={'title-block'}>
            <div className={'title-label'}>
                <div className={'title-up'}>
                    <h1 className={'title-up-text'}>Bienvenue sur</h1>
                </div>
                <div className={'title-icon'}>
                    <img src={'logo.png'} alt={'logo'}/>
                </div>
                <div className={'title-down'}>
                    <div className={'title-down-label'}>
                        <h1 className={'title-down-label-text'}>Comics-room</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default TitleBlock
