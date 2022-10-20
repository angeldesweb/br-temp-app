<script>
    import { Router , Route } from 'svelte-navigator'
    import Home from './views/Home.svelte';
    import Landing from './views/Landing.svelte';
    import New from './views/New.svelte';
    import SignIn from './views/SignIn.svelte';
    import SignUp from './views/SignUp.svelte';
    import NotFound from './views/NotFound.svelte';
    import Account from './views/Account.svelte';
    import MyProps from './views/MyProps.svelte';
    import { user } from './store';
    import WithNav from './views/layout/WithNav.svelte';
    import Detail from './views/Detail.svelte';
  
  

    const url = import.meta.env.VITE_API_URL;

    $: session = JSON.parse(localStorage.getItem('session'));

    $: if(!!session) {
        const { uid , username , profile , premium , isAuth } = session;
        user.login({uid,username,profile,premium,isAuth})
    }
</script>

<Router>
    <div data-theme="light">
        <Route path="/">
            <Landing/>
        </Route>
        <Route path="home">
            <WithNav>
                <Home/>
            </WithNav>
        </Route>
        <Route path="signup">
            <WithNav>
                <SignUp/>
            </WithNav>
        </Route>
        <Route path="signin">
            <WithNav>
                <SignIn/>
            </WithNav>
        </Route>
        <Route path="new">
            <WithNav>
                <New/>
            </WithNav>
        </Route>
        <Route path="account">
            <WithNav>
                <Account/>
            </WithNav>
        </Route>
        <Route path="properties">
            <WithNav>
                <MyProps/>
            </WithNav>
        </Route>
        <Route path="property/*">
            <WithNav>
                <Route path=":id" let:params component={Detail} />
            </WithNav>
            <Route>
                <NotFound/>
            </Route>
        </Route>
        <Route>
            <NotFound/>
        </Route>
    </div>
</Router>