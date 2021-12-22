import { useState, useEffect } from 'react';
import { Link, Spinner } from 'components';
import { Layout } from 'components/delegation';
import { delegationService } from 'services';

export default Index;

function Index() {
    const [delgs, setDelgs] = useState(null);

    useEffect(() => {
        delegationService.getAll().then(x => setDelgs(x));
    }, []);

    function deleteDelg(id) {
        setDelgs(delgs.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        delegationService.delete(id).then(() => {
            setDelgs(delgs => delgs.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h4>My Delegation Accounts/Wallets</h4>
            <Link href="/delegation/add" className="btn btn-sm btn-success mb-2">Add Account/Wallet</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Address</th>
                        <th style={{ width: '30%' }}>Chain</th>
                        <th style={{ width: '30%' }}>Coin</th>
                     
                    </tr>
                </thead>
                <tbody>
                    {delgs && delgs.length > 0 && delgs.map(delg =>
                        <tr key={delg.id}>
                            <td>{delg.address}</td>
                            <td>{delg.chain}</td>
                            <td>{delg.coin}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/delegation/edit/${delg.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteDelg(delg.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={delg.isDeleting}>
                                    {delg.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!delgs &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {delgs && !delgs.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Delegation Accounts To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Layout>
    );
}
