import { Button, Stack } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';

function NameAndLinks(props : {name: string}) {

    return (

        <div className='sticky-top d-flex justify-content-center mt-4 pt-5 '>
            <div className="justify-content-center align-items-center 
              h-100 w-100  align-middle  rounded  p-3" id="intro">

                <h5>
                    Hie There, I am
                </h5>

                <div className="display-2 mb-3 name-font" >
                    {props.name}
                </div>

                <div className='mb-3'>
                    Professional Software Developer with a passion for delivering reliable software solutions
                </div>

                <div>
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="dark">
                            Hire Me
                        </Button>
                        <Button variant="dark">
                            CV
                        </Button>
                    </Stack>
                </div>

                <div className='mt-3 pt-3'>
                    <Stack direction="horizontal" gap={2}>
                        <SocialIcon url="https://twitter.com/" bgColor="black" style={{ height: 40, width: 40 }} />
                        <SocialIcon url="https://www.linkedin.com/in/tinashe-mukundi-chitamba-1843391a7/" bgColor="black" style={{ height: 40, width: 40 }} />
                        <SocialIcon url="https://github.com/MukundiCode" bgColor="black" style={{ height: 40, width: 40 }} />
                    </Stack>
                </div>

            </div>
        </div>
    )
}

export default NameAndLinks;