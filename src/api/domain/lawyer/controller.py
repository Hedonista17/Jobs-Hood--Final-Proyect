import api.domain.lawyer.repository as Repository
import api.handle_response as Response
from api.functions import verify_user
import api.domain.user.repository as UserRepository


def get_lawyers():
    resultado = Repository.get_lawyers()
    return Response.response_ok(resultado, "Todos los abogados", 201)

def register_lawyer(data):

    new_lawyer = verify_user(data)
    
    if new_lawyer.get("error") is not None:
        return new_lawyer

    return Repository.register_lawyer(data,
    data['address'], 
    data['province'],  
    data['col_number']
    )

def edit_user_lawyer(user_id,info):
 
    lawyer = Repository.get_lawyer_by_user_id(user_id)
    if lawyer is None:
        return None
    if user_id == lawyer.user_id:
        user =  UserRepository.edit_user_by_role(user_id, info)
        edited_lawyer = Repository.edit_user_lawyer(info, lawyer)
        return user 
    return None