import {Search} from 'lucide-react'
import "./siteList.css"
import Button from "../button/Button.jsx";
import TableOfSites from "./TableOfSites.jsx";
import {useState} from "react";
import Modal from "../modal/Modal.jsx";
import CreateSiteModal from "./CreateSiteModal.jsx";
import {useJobSite} from "../context/JobSiteContext.jsx";

const SiteList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data} = useJobSite()

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={'site-list-container'}>
            <div className={'title'}>
                Title
            </div>
            <div className={'search-create-container'}>
                <div className={'search'}>
                    <Search size={18}/>
                    <input
                        type='text'
                        placeholder={'Search a driver'}
                    />
                </div>
                <div className={'create'}>
                    <Button variant={'save'} color={'light'} onClick={openModal}/>
                </div>
            </div>
            <div className={'jobsite-table-container'}>
                <TableOfSites jobsites={data} />
            </div>

            <CreateSiteModal isModalOpen={isModalOpen} closeModal={closeModal} />
        </div>
    )
}

export default SiteList