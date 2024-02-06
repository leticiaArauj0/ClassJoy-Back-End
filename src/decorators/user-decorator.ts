/* eslint-disable prettier/prettier */
import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    if(request.user) {
        
        if(filter) {
            return request.user[filter]
        } else {
            return request.User
        }

    } else {
        throw new NotFoundException("Usuário não encontrado no Request")
    }
})
