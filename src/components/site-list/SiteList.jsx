import {Search} from 'lucide-react'
import "./styles/siteList.css"
import Button from "../button/Button.jsx";
import TableOfSites from "./TableOfSites.jsx";
import {useState} from "react";
import CreateSiteModal from "./CreateSiteModal.jsx";
import {useJobSite} from "../context/JobSiteContext.jsx";

/**
 * Job site list component with search functionality and create modal.
 * Displays the jobsite data on a table
 */
const SiteList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const {data} = useJobSite()

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const filteredData = data.filter(d => {
        return d.address.trim().toLowerCase().includes(searchText.trim().toLowerCase());
    })

    return (
        <div className={'site-list-container'}>
            <div className={'title'}>
                Title
            </div>
            <div className={'search-create-container'}>
                <div className={'search'}>
                    <Search size={18}/>
                    <input
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        type='text'
                        placeholder={'Search a driver'}
                    />
                </div>
                <div className={'create'}>
                    <Button variant={'create'} color={'light'} onClick={openModal}/>
                </div>
            </div>
            <div className={'jobsite-table-container'}>
                {filteredData.length > 0 ? (
                    <TableOfSites jobsites={filteredData} />
                ) : (
                    <div style={{display: 'flex', justifyContent: 'center', margin: '2rem', fontSize: '1.4rem'}}>
                        No results found
                    </div>
                )}

            </div>

            <CreateSiteModal isModalOpen={isModalOpen} closeModal={closeModal} />
        </div>
    )
}

export default SiteList