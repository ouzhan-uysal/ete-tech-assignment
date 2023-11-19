import { FC, useState } from 'react'
import { ICustomTab } from '../../types/custom/tab.interface';

const CustomTab: FC<ICustomTab> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="tab-container">
      <div className="tab-header">
        <ul>
          {tabs.map((elm, index) => (
            <li style={{
              color: `${activeTab === index ? elm.color : ''}`,
              borderBottomColor: `${activeTab === index ? elm.color : ''}`,
            }} onClick={() => setActiveTab(index)}>{elm.label}</li>
          ))}
        </ul>
      </div>
      <div className="tab-content">
        {tabs[activeTab].children}
      </div>
    </div>
  )
}

export default CustomTab;
