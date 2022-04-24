// TODO: replace this whole file with something more modern. This is all copied
//       from sollet.


export function swap(): any {


    // if (this.swapping) return;
    // this.swapping = true;


    // let payload_batch = null;

    // await connectTempleWalletWrapper();
    
    // const me = getAccount().pkh
    // const recipient = this.send ? this.recipientAddress : me;

    // const inTk = this.inputToken!;
    // const outTk = this.outputToken!;
    // const inTkAddress = this.inputTokenAddress != undefined ? this.inputTokenAddress : 'KT1SaouedthKUtAujiBD232mZYGtKwpZ6mFD';
    // const outTkAddress = this.outputTokenAddress != undefined ? this.outputTokenAddress : 'KT1SaouedthKUtAujiBD232mZYGtKwpZ6mFD';
    // const inpAmn = this.inputAmount!;
    // const minOut = this.minimumReceived!;
    // const corminOut = new BigNumber(this.minimumReceived!);

    // // @ts-ignore: Object is possibly 'null'.
    // const minOutNat = tzToMutez(corminOut).c[0];

    // let firemessage: any = {};

    // let pairId = await getTokenPairsID(inTkAddress,outTkAddress);

    // if(pairId == undefined){
    //   firemessage = {
    //     title: 'Unavailable Pair',
    //     html:
    //       'We only support FA12 and FA1218 Pair Transaction now.',
    //     showCancelButton: false,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Done!'
    //   }

    //   this.$fire(firemessage);

    //   this.swapping = false;
    //   this.swapStatus = this.defaultSwapStatus;
      
    //   return
    // }

    // const net = getNetwork();
    // let response: any;

    // if(this.send){

    //   let payload_swap = {
    //     params: {
    //       pairId: parseInt(pairId, 10),
    //       direction: `b_to_a`,
    //       swapParams: {
    //         amountIn: inpAmn,
    //         minAmountOut: minOutNat.toString(),
    //         deadline: add(new Date(), { minutes: 10 }).toISOString(),
    //         receiver: recipient
    //       }
    //     },
    //     sendParams: {
    //       to: "",
    //       amount: 0,
    //       mutez: true
    //     }
    //   }


    //   response = await swapDirect(net.id, payload_swap);
    //   console.log("## Send Transfer ##");
    //   console.log(response);

    //   // @ts-ignore: Object is possibly 'null'.
    //   payload_batch = response.data?.swapDirect;

    // }else{


    //   let payload_swap = {
    //     params: {
    //       pairId: parseInt(pairId, 10),
    //       direction: `b_to_a`,
    //       swapParams: {
    //         amountIn: inpAmn,
    //         minAmountOut: minOutNat.toString(),
    //         deadline: add(new Date(), { minutes: 10 }).toISOString(),
    //         receiver:  me
    //       }
    //     },
    //     sendParams: {
    //       to: "",
    //       amount: 0,
    //       mutez: true
    //     }
    //   };



    //   response = await swapDirect(net.id, payload_swap);
    //   console.log("## swapDirect ##");
    //   console.log(response);
    //   payload_batch = response.data?.swapDirect;
    // }

    // const response_batchcalls = await batchContractCalls(payload_batch);
    // console.log("## Batch Calls ##");
    // const response_batch:any = response_batchcalls.data?.batchWalletContractCalls;
    // console.log(response_batchcalls);
    // console.log(response_batch);
    

    // if(response_batch != undefined){
    //   firemessage = {
    //     title: 'Successful',
    //     html:
    //       'Transaction ' +
    //       '<a href="https://hangzhou.tzstats.com/'+response_batch+'" target="_blank"><b style="color: green;">...'+response_batch?.substring(response_batch?.length - 10)+'</b></a> ' +
    //       ' was completed.',
    //     showCancelButton: false,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Done!',
    //     onClose: this.reloadpage
    //   }
    // }else{
    //   firemessage = {
    //     title: 'Unsuccessful',
    //     html:
    //       'Operation was unsuccessful',
    //     showCancelButton: false,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Done!',
    //     onClose: this.reloadpage
    //   }
    // }

    // this.$fire(firemessage);


    // this.swapping = false;
    // this.swapStatus = this.defaultSwapStatus;
    
}
