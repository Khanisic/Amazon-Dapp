import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
// import { amazonAbi, amazonCoinAddress } from '../lib/constants'
import { ethers } from 'ethers'

export const AmazonContext = createContext()

export const AmazonProvider = ({ children }) => {

    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')
    const [assets, setAssets] = useState([])

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
    } = useMoralis()

    const { 
        data: assetsData,
        error: assetsDataError,
        isLoading: userDataisLoading
    } = useMoralisQuery('assets')

    useEffect(() => {
        ; (async () => {
            if (isAuthenticated) {
                const currentUsername = await user?.get('nickname');
                setUsername(currentUsername);
            }
        })()
    }, [isAuthenticated, user, username])

    const getAssets = async () => {
        try {
            await enableWeb3();
            setAssets(assetsData);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        ; (async () => {
            if (isWeb3Enabled) {
                await getAssets();
            }
        })()

    }, [getAssets, isWeb3Enabled])


    const handleSetUsername = () => {
        if (user) {
            if (nickname) {
                user.set('nickname', nickname)
                user.save()
                setNickname('')
            } else {
                console.log("Can't set empty nickname")
            }
        } else {
            console.log('No user')
        }
    }


    return (
        <AmazonContext.Provider
            value={{
                //   formattedAccount,
                isAuthenticated,
                //   buyTokens,
                //   getBalance,
                //   balance,
                //   setTokenAmount,
                //   tokenAmount,
                //   amountDue,
                //   setAmountDue,
                //   isLoading,
                //   setIsLoading,
                //   setEtherscanLink,
                //   etherscanLink,
                //   buyAsset,
                //   currentAccount,
                nickname,
                setNickname,
                username,
                setUsername,
                handleSetUsername,
                assets,
                //   recentTransactions,
                //   ownedItems,
            }}
        >
            {children}
        </AmazonContext.Provider>
    )
}