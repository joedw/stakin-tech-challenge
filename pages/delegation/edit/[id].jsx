import { useState, useEffect } from 'react';

import { Layout, AddEdit } from 'components/delegation';
import { Spinner } from 'components';
import { delegationService, alertService } from 'services';

export default Edit;

function Edit({ id }) {
    const [delg, setdelg] = useState(null);

    useEffect(() => {
        // fetch delg and set default form values if in edit mode
        delegationService.getById(id)
            .then(x => setdelg(x))
            .catch(alertService.error)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <h1>Edit Delegation Account</h1>
            {delg ? <AddEdit delg={delg} /> : <Spinner /> }
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}
