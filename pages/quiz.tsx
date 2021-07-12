import QuizPanel from 'components/QuizPanel/QuizPanel';
import { GetServerSideProps } from 'next';
import { IUser, User } from 'models/User';

const Quiz = (props: any) => {
    return <QuizPanel question={props.question} />
}

//check if they already have a question

export const GetServerSideProps: GetServerSideProps = async(context) => {
    const { req, res } = context;

    const user: IUser = await User.findOne({ username: req.session.user.username });

    if(user.currentQuestion) {
        return {
            props: {
                question: user.currentQuestion
            }
        }
    }

    return {
        props: {}
    }
}

export default Quiz;