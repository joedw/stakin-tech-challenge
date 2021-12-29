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
                <h4 className="btn btn-primary">My Stakin Accounts/Rewards </h4>
            
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: '25%' }}>Address</th>
                            <th style={{ width: '25%' }}>Chain</th>
                            <th style={{ width: '25%' }}>Coin</th>
                            <th style={{ width: '25%' }}>Amt Staked </th>
                            <th style={{ width: '25%' }}>Rewards </th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {delgs && delgs.length > 0 && delgs.map(delg =>
                            <tr key={delg.id}>
                                <td>{delg.address}</td>
                                <td>{delg.chain}</td>
                                <td>{delg.coin}</td>
                                <td>{delg.amt}</td>
                                <td>{delg.stakingrewardsamt}</td>
                                
                                
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
