import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link } from 'components';
import {userService, delegationService, alertService } from 'services';
export { AddEdit };

function AddEdit(props) {
    const delg = props?.delg;
    const user = userService.userValue;
    const  userid = user.id;
    const isAddMode = !delg;
    const router = useRouter();
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        address: Yup.string()
            .required('Address is required') 
            .min(42, 'Address must be at least 42 characters'),
        chain: Yup.string()
            .required('Chain is required')
           
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        formOptions.defaultValues = props.delg;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createAcc(data)
            : updateAcc(delg.id, data);
    }

    function createAcc(data) {
        return delegationService.add(data)
            .then(() => {
                alertService.success('Address added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateAcc(id, data) {
        return delegationService.update(id, data)
            .then(() => {
                alertService.success('Address updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label>Wallet Address</label>
                    <input name="address" type="text" {...register('address')} className={`form-control ${errors.address? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.address?.message}</div>
                </div>
                <div className="form-group col">
                    <label  >Chain</label>
                    <select name="chain" id="chain" {...register('chain')} className={`form-control ${errors.chain ? 'is-invalid' : ''}`}>
                    <option value="">--Please choose an option--</option>
                    <option value="Polygon">Polygon</option>
                    <option value="Solana">Solana</option>
                  
                    </select>
                    <input name="userid" type="hidden" {...register('userid')} value={userid} ></input>
                    <div className="invalid-feedback">{errors.chain?.message}</div>
                </div>
            </div>
   
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/delegation" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}